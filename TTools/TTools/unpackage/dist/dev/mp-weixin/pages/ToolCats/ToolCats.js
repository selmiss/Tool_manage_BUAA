"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      username: "JING",
      title: "借用工具",
      labelList: [
        {
          name: "机械工具",
          id: 1,
          level: 1,
          lowerLabel: [{ name: "机械工具", id: 6, level: 2, url: "http://10.212.87.185/media/image/2_c4GQaje.png" }]
        },
        {
          name: "电控工具",
          id: 2,
          level: 1,
          lowerLabel: [{ name: "电控工具", id: 5, level: 2, url: "http://10.212.87.185/media/image/3_FhHGkv1.png" }]
        },
        {
          name: "机械电子设备",
          id: 3,
          level: 1,
          lowerLabel: [{ name: "机械电子设备", id: 4, level: 2, url: "http://10.212.87.185/media/image/1_nUbPquK.png" }]
        }
      ],
      pattern: {
        color: "#488800",
        backgroundColor: "#fff",
        selectedColor: "#007AFF",
        buttonColor: "#00ff00",
        iconColor: "#fff"
      }
    };
  },
  onShow() {
    if (getApp().globalData.uid === -1) {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    }
  },
  methods: {
    toBorrow() {
      common_vendor.index.navigateTo({
        url: "/pages/ToolCats/ToolCats"
      });
    },
    onClick(id) {
      console.log(id);
      common_vendor.index.navigateTo({
        url: "/pages/ToolList/ToolList?labelId=" + id
      });
    },
    getLabelList() {
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + "/user/getFirstLabelList",
        data: {},
        method: "POST",
        success: (res) => {
          this.labelList = res.data.labelList;
        }
      });
    }
  },
  created() {
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.labelList, (item, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.onClick(item.lowerLabel[0].id)),
        b: "564cda07-1-" + i0 + ",564cda07-0",
        c: common_vendor.p({
          title: item.lowerLabel[0].name,
          thumbnail: item.lowerLabel[0].url
        })
      };
    }),
    b: common_vendor.p({
      title: $data.title,
      subTitleFontSize: "16px",
      subTitle: "请选择工具分类",
      titleFontSize: "20px",
      type: "line"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/fancy/工训中心工具管理/Tool_manage_BUAA/TTools/TTools/pages/ToolCats/ToolCats.vue"]]);
wx.createPage(MiniProgramPage);
