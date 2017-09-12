const apis = {
  weather: {
    url: 'http://api.map.baidu.com/telematics/v3/weather?location=%E5%B9%BF%E5%B7%9E&output=json&ak=32da004455c52b48d84a3a484c0dbc99'
  },
  kugouSong: {
    url: 'http://mobilecdn.kugou.com/api/v3/search/song?format=json&keyword=xxx&page=3&pagesize=30&showtype=1',
    newSong: 'http://m.kugou.com/?json=true',
    ranklist: 'http://m.kugou.com/rank/list&json=true',
    rankinfolist: 'http://m.kugou.com/rank/info/${rankid}&json=true',
    plist: 'http://m.kugou.com/plist/index&json=true',
    plistlist:'http://m.kugou.com/plist/list/${specialid}?json=true',
    micusInfo: 'http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=${hash}'
  }
}