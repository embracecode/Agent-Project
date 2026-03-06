export type CityType = {
    text: string,
    value: string,
    children?: CityType[]
}

export const cityData: CityType[] = [
    {
        "text": "昆明市",
        "value": "kunming",
        "children": [
            { "text": "五华区", "value": "wuhua" },
            { "text": "盘龙区", "value": "panlong" },
            { "text": "官渡区", "value": "guandu" },
            { "text": "西山区", "value": "xishan" },
            { "text": "呈贡区", "value": "chenggong" },
            { "text": "晋宁区", "value": "jinning" },
            { "text": "安宁市", "value": "anning" },
            { "text": "富民县", "value": "fumin" },
            { "text": "宜良县", "value": "yiliang" },
            { "text": "石林彝族自治县", "value": "shilin" }
        ]
    },
    {
        "text": "曲靖市",
        "value": "qujing",
        "children": [
        { "text": "麒麟区", "value": "qilin" },
        { "text": "沾益区", "value": "zhanyi" },
        { "text": "马龙区", "value": "malong" },
        { "text": "宣威市", "value": "xuanwei" },
        { "text": "陆良县", "value": "luliang" },
        { "text": "师宗县", "value": "shizong" },
        { "text": "罗平县", "value": "luoping" }
        ]
    },
    {
        "text": "玉溪市",
        "value": "yuxi",
        "children": [
        { "text": "红塔区", "value": "hongta" },
        { "text": "江川区", "value": "jiangchuan" },
        { "text": "澄江市", "value": "chengjiang" },
        { "text": "通海县", "value": "tonghai" },
        { "text": "华宁县", "value": "huaning" },
        { "text": "易门县", "value": "yimen" },
        { "text": "峨山彝族自治县", "value": "eshan" }
        ]
    },
    {
        "text": "大理白族自治州",
        "value": "dali",
        "children": [
            { "text": "大理市", "value": "dalishi" },
            { "text": "祥云县", "value": "xiangyun" },
            { "text": "宾川县", "value": "binchuan" },
            { "text": "弥渡县", "value": "midu" },
            { "text": "永平县", "value": "yongping" },
            { "text": "云龙县", "value": "yunlong" },
            { "text": "洱源县", "value": "eryuan" }
        ]
    },
    {
        "text": "丽江市",
        "value": "lijiang",
        "children": [
            { "text": "古城区", "value": "gucheng" },
            { "text": "玉龙纳西族自治县", "value": "yulong" },
            { "text": "永胜县", "value": "yongsheng" },
            { "text": "华坪县", "value": "huaping" },
            { "text": "宁蒗彝族自治县", "value": "ninglang" }
        ]
    }
]