/**
 * 数据加载工具
 * 从网站远程加载奖项数据，带本地缓存兜底
 */

var API_BASE = 'https://www.52de.cc/data';

// 缓存 key
var CACHE_KEY_AWARDS = 'award_list_cache';
var CACHE_KEY_DETAILS = 'award_detail_';
var CACHE_EXPIRE_MS = 24 * 60 * 60 * 1000; // 24小时过期

/**
 * 通用远程请求（带缓存）
 * @param {string} cacheKey - 缓存key
 * @param {string} url - 远程URL
 * @param {number} expireMs - 缓存过期时间(毫秒)
 * @returns {Promise<Object>}
 */
function fetchWithCache(cacheKey, url, expireMs) {
  return new Promise(function(resolve, reject) {
    // 先读缓存
    try {
      var cached = wx.getStorageSync(cacheKey);
      if (cached && cached.data) {
        var age = Date.now() - (cached.timestamp || 0);
        if (age < (expireMs || CACHE_EXPIRE_MS)) {
          // 缓存未过期，直接返回，同时后台静默更新
          resolve(cached.data);
          _silentFetch(cacheKey, url, expireMs);
          return;
        }
        // 缓存过期，先返回旧数据，后台更新
        resolve(cached.data);
      }
    } catch (e) {
      // 缓存读取失败，继续请求
    }

    // 无缓存或缓存已过期，请求远程
    wx.request({
      url: url,
      success: function(res) {
        if (res.statusCode === 200 && res.data) {
          // 写入缓存
          try {
            wx.setStorageSync(cacheKey, {
              data: res.data,
              timestamp: Date.now()
            });
          } catch (e) { }
          resolve(res.data);
        } else {
          reject(new Error('HTTP ' + res.statusCode));
        }
      },
      fail: function(err) {
        // 最后尝试读一次过期缓存
        try {
          var cached = wx.getStorageSync(cacheKey);
          if (cached && cached.data) {
            resolve(cached.data);
            return;
          }
        } catch (e) { }
        reject(err);
      }
    });
  });
}

/**
 * 后台静默更新缓存（不触发回调）
 */
function _silentFetch(cacheKey, url, expireMs) {
  wx.request({
    url: url,
    success: function(res) {
      if (res.statusCode === 200 && res.data) {
        try {
          wx.setStorageSync(cacheKey, {
            data: res.data,
            timestamp: Date.now()
          });
        } catch (e) { }
      }
    },
    fail: function() { }
  });
}

/**
 * 列表页需要的字段（精简版，减小传输量）
 */
var LIST_FIELDS = [
  'award_id', 'award_name_cn', 'award_name_en', 'award_name_short',
  'category_main', 'country', 'prestige_level', 'difficulty_level',
  'fee_currency', 'fee_regular', 'fee_early_bird', 'deadline_final',
  'deadline_early', 'deadline_regular', 'logo_url', 'award_type'
];

/**
 * 从完整数据中提取列表字段
 */
function extractListFields(award) {
  var result = {};
  LIST_FIELDS.forEach(function(f) {
    if (award[f] !== undefined && award[f] !== null) {
      result[f] = award[f];
    }
  });
  return result;
}

/**
 * 获取所有奖项列表（精简字段，用于列表展示）
 * @returns {Promise<Array>}
 */
function getAwardsList() {
  return fetchWithCache(CACHE_KEY_AWARDS, API_BASE + '/awards.json', CACHE_EXPIRE_MS)
    .then(function(data) {
      var list = Array.isArray(data) ? data : (data.awards || []);
      return list.map(extractListFields);
    });
}

/**
 * 获取单个奖项完整数据
 * @param {string} awardId
 * @returns {Promise<Object>}
 */
function getAwardDetail(awardId) {
  var cacheKey = CACHE_KEY_DETAILS + awardId;

  return fetchWithCache(cacheKey, API_BASE + '/award-details.json', CACHE_EXPIRE_MS)
    .then(function(data) {
      var details = data.awards || data.details || data || [];
      // 找匹配的奖项
      var award = null;
      for (var i = 0; i < details.length; i++) {
        if (details[i].award_id === awardId) {
          award = details[i];
          break;
        }
      }
      if (!award) {
        console.warn('未找到奖项详情: ' + awardId);
        return null;
      }
      return award;
    });
}

/**
 * 获取获奖作品数据（暂未实现远程版）
 */
function getWinners(awardId, year) {
  return Promise.resolve(null);
}

/**
 * 按类别筛选奖项
 */
function filterAwardsByCategory(category, awardList) {
  if (!awardList) return [];
  if (!category || category === '全部') return awardList;
  return awardList.filter(function(a) {
    return a.category_main === category ||
      (a.category_sub && a.category_sub.indexOf(category) !== -1);
  });
}

/**
 * 按费用筛选奖项
 */
function filterAwardsByFee(maxFee, awardList) {
  if (!awardList) return [];
  return awardList.filter(function(a) {
    var fee = a.fee_regular || a.fee_early_bird || 9999;
    return fee <= maxFee;
  });
}

module.exports = {
  getAwardsList: getAwardsList,
  getAwardDetail: getAwardDetail,
  getWinners: getWinners,
  filterAwardsByCategory: filterAwardsByCategory,
  filterAwardsByFee: filterAwardsByFee
};
