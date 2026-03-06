/**
 * 模拟查询火车票函数
 * @param {Object} args - 从 tool_calls arguments 解析出的对象
 * @param {string} args.departure - 出发城市
 * @param {string} args.destination - 到达城市
 * @param {string} args.date - 日期 (格式: YYYY-MM-DD)
 * @returns {Promise<Object>} 返回标准化的查询结果
 */
async function trainTickets({ departure, destination, date }) {
  console.log(`[工具调用] 正在查询 ${date} 从 ${departure} 到 ${destination} 的火车票...`);

  // 在实际场景中，这里会调用真实的铁路 API 或爬虫数据
  const mockResults = [
    {
      train_number: "G531",
      departure_time: "06:08",
      arrival_time: "12:04",
      duration: "5小时56分",
      station_from: "北京南",
      station_to: "上海虹桥",
      seats: {
        second_class: { price: 553, status: "有票" },
        first_class: { price: 930, status: "有票" },
        business: { price: 1873, status: "余票紧张" }
      }
    },
    {
      train_number: "G547",
      departure_time: "06:18",
      arrival_time: "12:11",
      duration: "5小时53分",
      station_from: "北京南",
      station_to: "上海虹桥",
      seats: {
        second_class: { price: 553, status: "有票" },
        first_class: { price: 930, status: "无票" },
        business: { price: 1873, status: "有票" }
      }
    },
    {
      train_number: "G3",
      departure_time: "06:52",
      arrival_time: "11:33",
      duration: "4小时41分",
      station_from: "北京南",
      station_to: "上海虹桥",
      seats: {
        second_class: { price: 553, status: "抢票中" },
        first_class: { price: 930, status: "抢票中" },
        business: { price: 1873, status: "有票" }
      }
    }
  ];

  return {
    success: true,
    query_info: {
      from: departure,
      to: destination,
      date: date
    },
    total_count: mockResults.length,
    trains: mockResults
  };
}
const getWeather = (args) => {
    const weatherConditions = ["晴天", "多云", "雨天"];  
    const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];  
    const location = args.location;  
    return `${location}今天是${randomWeather}。`; 
}

const typeMap = {
    "trainTickets": trainTickets,
    "getWeather": getWeather
}

const typeFunction = (type, args) => {
    return typeMap[type](args)
};

module.exports = typeFunction;