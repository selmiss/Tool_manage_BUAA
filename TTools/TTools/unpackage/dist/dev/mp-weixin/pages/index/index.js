"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      openid: "",
      managerform: {},
      userform: {},
      target: "",
      isManager: false,
      isLogin: 0,
      userInfo: {},
      color: "#7A7E83",
      pattern: {
        backgroundColor: "#fff",
        selectedColor: "#007AFF",
        buttonColor: "#007AFF",
        iconColor: "#fff"
      },
      content: [
        {
          iconPath: "https://img2.baidu.com/it/u=546153345,3989268214&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          selectedIconPath: "https://img2.baidu.com/it/u=546153345,3989268214&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          text: "\u5B66\u751F",
          active: true
        },
        {
          iconPath: "https://img1.baidu.com/it/u=3315202342,1207980959&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          selectedIconPath: "https://img1.baidu.com/it/u=3315202342,1207980959&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
          text: "\u6559\u5E08",
          active: false
        }
      ],
      href: "https://uniapp.dcloud.io/component/README?id=uniui",
      form: {
        email: "",
        password: ""
      }
    };
  },
  onShow() {
    console.log(getApp().globalData.uid);
    common_vendor.index.request({
      header: { "Authorization": getApp().globalData.token },
      url: getApp().globalData.urlRoot + "/user/getInfo",
      data: { uid: getApp().globalData.uid },
      method: "POST",
      success: (res) => {
        console.log(res);
        if (res.data.error_code === 0) {
          this.isLogin = 1;
          this.userInfo = res.data;
        } else {
          this.isLogin = 0;
        }
      }
    });
  },
  methods: {
    userEdit() {
      var that = this;
      if (that.userform.password === that.userform.password1) {
        common_vendor.index.request({
          header: {
            "Authorization": getApp().globalData.token,
            "content-type": "application/x-www-form-urlencoded"
          },
          url: getApp().globalData.urlRoot + "/user/wx_Register",
          data: {
            "studentId": that.userform.studentId,
            "name": that.userform.name,
            "college": that.userform.college,
            "acc": that.userform.email,
            "pwd": that.userform.password,
            "phoneNumber": that.userform.number,
            "openid": that.openid
          },
          method: "POST",
          success: (res) => {
            that.form.email = that.userform.email;
            that.form.password = that.userform.password;
            that.submitLogin();
            that.$refs.userRe.close();
          }
        });
      } else {
        console.log("\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u81F4");
      }
    },
    managerEdit() {
      var that = this;
      if (that.managerform.password == that.managerform.password1) {
        common_vendor.index.request({
          header: {
            "Authorization": getApp().globalData.token,
            "content-type": "application/x-www-form-urlencoded"
          },
          url: getApp().globalData.urlRoot + "/manager/wx_Register",
          data: {
            "acc": that.managerform.email,
            "teacherId": that.managerform.tId,
            "name": that.managerform.name,
            "pwd": that.managerform.password,
            "phoneNumber": that.managerform.number,
            "openid": that.openid
          },
          method: "POST",
          success: (res) => {
            that.form.email = that.managerform.email;
            that.form.password = that.managerform.password;
            that.submitLogin();
            that.$refs.managerRe.close();
          }
        });
      } else {
        console.log("\u4E24\u6B21\u5BC6\u7801\u4E0D\u4E00\u81F4");
      }
    },
    wxlogin() {
      var that = this;
      let wxspAppid = "wxc6210b45fc53b29d";
      let wxspSecret = "a84513f04d24a63539294f919b61cacd";
      let oid = "";
      let isM = "0";
      if (this.isManager) {
        isM = "1";
      } else {
        isM = "0";
      }
      common_vendor.index.login({
        provider: "weixin",
        success(res) {
          if (res.code) {
            common_vendor.index.request({
              url: "https://api.weixin.qq.com/sns/jscode2session?appid=" + wxspAppid + "&secret=" + wxspSecret + "&js_code=" + res.code + "&grant_type=authorization_code",
              method: "POST",
              success(res2) {
                oid = res2.data.openid;
                that.openid = oid;
                common_vendor.index.request({
                  header: {
                    "Authorization": "wutoken",
                    "content-type": "application/x-www-form-urlencoded"
                  },
                  url: getApp().globalData.urlRoot + "/manager/wxlogin",
                  data: {
                    "openid": oid,
                    "isM": isM
                  },
                  method: "POST",
                  success: (res3) => {
                    if (res3.data.haveuser === "1") {
                      console.log("\u5230\u8FD9\u91CC");
                      that.form.email = res3.data.email;
                      that.form.password = res3.data.pwd;
                      that.wxsubmitLogin();
                    } else {
                      console.log("\u6CA1\u6709\u68C0\u6D4B\u5230");
                      if (that.isManager) {
                        that.$refs.managerRe.open("center");
                      } else {
                        that.$refs.userRe.open("center");
                      }
                    }
                  }
                });
              },
              fail(data) {
              }
            });
          } else {
            console.log("\u767B\u5F55\u5931\u8D25\uFF01" + res.errMsg);
          }
        }
      });
    },
    logout() {
      this.isLogin = 0;
      getApp().globalData.uid = -1;
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + "/user/unLogin",
        data: { uid: getApp().globalData.uid },
        method: "POST",
        success: (res) => {
          console.log(res);
          if (res.data.error_code === 0) {
            this.isLogin = 1;
            this.userInfo = res.data;
            getApp().globalData.token = "wutoken";
          }
        }
      });
    },
    toweb() {
      this.$refs.toWeb.open();
    },
    goTools() {
      common_vendor.index.navigateTo({
        url: "/pages/stu-Main/stu-Main"
      });
    },
    editInfo() {
      common_vendor.index.navigateTo({
        url: "/pages/self/self"
      });
    },
    changePassword() {
      common_vendor.index.navigateTo({
        url: "/pages/newPassword/newPassword"
      });
    },
    submitLogin() {
      console.log(this.form.password);
      getApp().globalData.token = "wutoken";
      console.log(this.form);
      this.target = "/user/login";
      if (this.isManager) {
        this.target = "/manager/Login";
      }
      console.log(this.target);
      console.log(getApp().globalData.token);
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + this.target,
        data: { "acc": this.form.email, "pwd": this.form.password },
        header: { "Authorization": getApp().globalData.token },
        method: "POST",
        success: (res) => {
          console.log(res.data);
          if (res.data.error_code == 0) {
            getApp().globalData.uid = res.data.uid;
            getApp().globalData.token = res.data.hash_code;
            common_vendor.index.showToast({
              title: "\u767B\u5F55\u6210\u529F\uFF01",
              icon: "none"
            });
            if (this.isManager) {
              common_vendor.index.navigateTo({
                url: "/pages/Teacher/tea-main/tea-main"
              });
            } else {
              common_vendor.index.request({
                header: { "Authorization": getApp().globalData.token },
                url: getApp().globalData.urlRoot + "/user/getInfo",
                data: { uid: getApp().globalData.uid },
                method: "POST",
                success: (res2) => {
                  if (res2.data.error_code === 0) {
                    this.isLogin = 1;
                    this.userInfo = res2.data;
                  }
                }
              });
            }
          } else if (res.data.error_code == 2 || res.data.error_code == 4) {
            common_vendor.index.showToast({
              title: String("\u7528\u6237\u540D\u6216\u5BC6\u7801\u4E0D\u6B63\u786E\uFF01"),
              icon: "none"
            });
          }
        }
      });
    },
    wxsubmitLogin() {
      console.log(this.form.password);
      getApp().globalData.token = "wutoken";
      console.log(this.form);
      this.target = "/user/hashLogin";
      if (this.isManager) {
        this.target = "/manager/hashLogin";
      }
      console.log(this.target);
      console.log(getApp().globalData.token);
      common_vendor.index.request({
        header: { "Authorization": getApp().globalData.token },
        url: getApp().globalData.urlRoot + this.target,
        data: { "acc": this.form.email, "pwd": this.form.password },
        header: { "Authorization": getApp().globalData.token },
        method: "POST",
        success: (res) => {
          console.log(res.data);
          if (res.data.error_code == 0) {
            getApp().globalData.uid = res.data.uid;
            getApp().globalData.token = res.data.hash_code;
            common_vendor.index.showToast({
              title: "\u767B\u5F55\u6210\u529F\uFF01",
              icon: "none"
            });
            if (this.isManager) {
              common_vendor.index.navigateTo({
                url: "/pages/Teacher/tea-main/tea-main"
              });
            } else {
              common_vendor.index.request({
                header: { "Authorization": getApp().globalData.token },
                url: getApp().globalData.urlRoot + "/user/getInfo",
                data: { uid: getApp().globalData.uid },
                method: "POST",
                success: (res2) => {
                  if (res2.data.error_code === 0) {
                    this.isLogin = 1;
                    this.userInfo = res2.data;
                  }
                }
              });
            }
          } else if (res.data.error_code == 2 || res.data.error_code == 4) {
            common_vendor.index.showToast({
              title: String("\u7528\u6237\u540D\u6216\u5BC6\u7801\u4E0D\u6B63\u786E\uFF01"),
              icon: "none"
            });
          }
        }
      });
    },
    fabClick() {
      common_vendor.index.showToast({
        title: "\u5207\u6362\u767B\u5F55\u65B9\u5F0F",
        icon: "none"
      });
    },
    trigger(e) {
      console.log(e);
      if (e.index === 1) {
        this.content[e.index].active = !e.item.active;
        this.content[0].active = !e.item.active;
        this.isManager = true;
      } else {
        this.content[e.index].active = !e.item.active;
        this.content[1].active = !e.item.active;
        this.isManager = false;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_title2 = common_vendor.resolveComponent("uni-title");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_link2 = common_vendor.resolveComponent("uni-link");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_title2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_fab2 + _easycom_uni_forms2 + _easycom_uni_card2 + _easycom_uni_icons2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_section2 + _easycom_uni_link2 + _easycom_uni_popup2)();
}
const _easycom_uni_title = () => "../../uni_modules/uni-title/components/uni-title/uni-title.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_fab = () => "../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_link = () => "../../uni_modules/uni-link/components/uni-link/uni-link.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_title + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_fab + _easycom_uni_forms + _easycom_uni_card + _easycom_uni_icons + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_section + _easycom_uni_link + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isLogin === 0
  }, $data.isLogin === 0 ? common_vendor.e({
    b: !$data.isManager
  }, !$data.isManager ? {
    c: common_vendor.p({
      type: "h1",
      title: "\u5B66\u751F\u767B\u5F55"
    })
  } : {}, {
    d: $data.isManager
  }, $data.isManager ? {
    e: common_vendor.p({
      type: "h1",
      color: "orange",
      title: "\u6559\u5E08\u767B\u5F55"
    })
  } : {}, {
    f: common_vendor.o(($event) => $data.form.email = $event),
    g: common_vendor.p({
      type: "text",
      placeholder: "\u8BF7\u8F93\u5165\u90AE\u7BB1",
      modelValue: $data.form.email
    }),
    h: common_vendor.p({
      label: "\u90AE\u7BB1",
      name: "name"
    }),
    i: common_vendor.o(($event) => $data.form.password = $event),
    j: common_vendor.p({
      type: "password",
      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
      modelValue: $data.form.password
    }),
    k: common_vendor.o((...args) => $options.toweb && $options.toweb(...args)),
    l: common_vendor.o((...args) => $options.toweb && $options.toweb(...args)),
    m: common_vendor.sr("fab", "c7f3f8e6-7,c7f3f8e6-5"),
    n: common_vendor.o($options.trigger),
    o: common_vendor.o($options.fabClick),
    p: common_vendor.p({
      pattern: $data.pattern,
      content: $data.content,
      horizontal: "right",
      vertical: "bottom",
      direction: _ctx.direction
    }),
    q: common_vendor.p({
      label: "\u5BC6\u7801",
      name: "name"
    }),
    r: common_vendor.p({
      modelValue: $data.form,
      ["label-position"]: "top"
    }),
    s: common_vendor.o((...args) => $options.submitLogin && $options.submitLogin(...args)),
    t: common_vendor.o((...args) => $options.wxlogin && $options.wxlogin(...args))
  }) : {}, {
    v: $data.isLogin === 1
  }, $data.isLogin === 1 ? {
    w: common_vendor.t($data.userInfo.college),
    x: common_vendor.t($data.userInfo.acc),
    y: common_vendor.t($data.userInfo.phoneNumber),
    z: common_vendor.o((...args) => $options.logout && $options.logout(...args)),
    A: common_vendor.p({
      title: $data.userInfo.name,
      extra: "\u5B66\u5DE5\u53F7:" + $data.userInfo.studentId
    }),
    B: common_vendor.p({
      type: "eye-filled",
      size: "30"
    }),
    C: common_vendor.o((...args) => $options.changePassword && $options.changePassword(...args)),
    D: common_vendor.p({
      type: "person",
      size: "30"
    }),
    E: common_vendor.o((...args) => $options.editInfo && $options.editInfo(...args)),
    F: common_vendor.p({
      type: "settings-filled",
      size: "30"
    }),
    G: common_vendor.o((...args) => $options.goTools && $options.goTools(...args)),
    H: common_vendor.p({
      column: 3,
      highlight: true,
      square: true,
      ["show-border"]: false
    }),
    I: common_vendor.p({
      titleFontSize: "18px",
      title: "\u5DF2\u767B\u5F55",
      type: "line"
    })
  } : {}, {
    J: common_vendor.p({
      href: "http://121.4.160.157:8080/",
      text: "http://121.4.160.157:8080/"
    }),
    K: common_vendor.sr("toWeb", "c7f3f8e6-17"),
    L: common_vendor.p({
      type: "top",
      ["background-color"]: "#fff"
    }),
    M: common_vendor.p({
      type: "h1",
      align: "center",
      title: "\u586B\u5199\u4E2A\u4EBA\u4FE1\u606F"
    }),
    N: common_vendor.o(($event) => $data.managerform.tId = $event),
    O: common_vendor.p({
      type: "text",
      placeholder: "\u60A8\u7684\u5B66\u53F7",
      modelValue: $data.managerform.tId
    }),
    P: common_vendor.p({
      label: "\u5DE5\u53F7",
      name: "name"
    }),
    Q: common_vendor.o(($event) => $data.managerform.name = $event),
    R: common_vendor.p({
      type: "text",
      placeholder: "\u60A8\u7684\u59D3\u540D",
      modelValue: $data.managerform.name
    }),
    S: common_vendor.p({
      label: "\u59D3\u540D",
      name: "name"
    }),
    T: common_vendor.o(($event) => $data.managerform.email = $event),
    U: common_vendor.p({
      type: "text",
      placeholder: "\u60A8\u7684\u90AE\u7BB1",
      modelValue: $data.managerform.email
    }),
    V: common_vendor.p({
      label: "\u90AE\u7BB1",
      name: "name"
    }),
    W: common_vendor.o(($event) => $data.managerform.number = $event),
    X: common_vendor.p({
      type: "text",
      placeholder: "\u60A8\u7684\u7535\u8BDD",
      modelValue: $data.managerform.number
    }),
    Y: common_vendor.p({
      label: "\u7535\u8BDD",
      name: "name"
    }),
    Z: common_vendor.o(($event) => $data.managerform.password = $event),
    aa: common_vendor.p({
      type: "password",
      placeholder: "\u60A8\u7684\u5BC6\u7801",
      modelValue: $data.managerform.password
    }),
    ab: common_vendor.p({
      label: "\u5BC6\u7801",
      name: "name"
    }),
    ac: common_vendor.o(($event) => $data.managerform.password1 = $event),
    ad: common_vendor.p({
      type: "password",
      placeholder: "\u91CD\u65B0\u8F93\u5165\u60A8\u7684\u5BC6\u7801",
      modelValue: $data.managerform.password1
    }),
    ae: common_vendor.p({
      label: "\u786E\u8BA4\u5BC6\u7801",
      name: "name"
    }),
    af: common_vendor.p({
      modelValue: $data.managerform,
      ["label-position"]: "left"
    }),
    ag: common_vendor.o(($event) => $options.managerEdit()),
    ah: common_vendor.sr("managerRe", "c7f3f8e6-19"),
    ai: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    aj: common_vendor.p({
      type: "h1",
      align: "center",
      title: "\u586B\u5199\u4E2A\u4EBA\u4FE1\u606F"
    }),
    ak: common_vendor.o(($event) => $data.userform.studentId = $event),
    al: common_vendor.p({
      type: "text",
      placeholder: "\u60A8\u7684\u5B66\u53F7",
      modelValue: $data.userform.studentId
    }),
    am: common_vendor.p({
      label: "\u5B66\u53F7",
      name: "name"
    }),
    an: common_vendor.o(($event) => $data.userform.name = $event),
    ao: common_vendor.p({
      type: "text",
      placeholder: "\u60A8\u7684\u59D3\u540D",
      modelValue: $data.userform.name
    }),
    ap: common_vendor.p({
      label: "\u59D3\u540D",
      name: "name"
    }),
    aq: common_vendor.o(($event) => $data.userform.college = $event),
    ar: common_vendor.p({
      type: "text",
      placeholder: "\u60A8\u7684\u5B66\u9662",
      modelValue: $data.userform.college
    }),
    as: common_vendor.p({
      label: "\u5B66\u9662",
      name: "name"
    }),
    at: common_vendor.o(($event) => $data.userform.email = $event),
    av: common_vendor.p({
      type: "text",
      placeholder: "\u60A8\u7684\u90AE\u7BB1",
      modelValue: $data.userform.email
    }),
    aw: common_vendor.p({
      label: "\u90AE\u7BB1",
      name: "name"
    }),
    ax: common_vendor.o(($event) => $data.userform.number = $event),
    ay: common_vendor.p({
      type: "text",
      placeholder: "\u60A8\u7684\u7535\u8BDD",
      modelValue: $data.userform.number
    }),
    az: common_vendor.p({
      label: "\u7535\u8BDD",
      name: "name"
    }),
    aA: common_vendor.o(($event) => $data.userform.password = $event),
    aB: common_vendor.p({
      type: "password",
      placeholder: "\u60A8\u7684\u5BC6\u7801",
      modelValue: $data.userform.password
    }),
    aC: common_vendor.p({
      label: "\u5BC6\u7801",
      name: "name"
    }),
    aD: common_vendor.o(($event) => $data.userform.password1 = $event),
    aE: common_vendor.p({
      type: "password",
      placeholder: "\u91CD\u65B0\u8F93\u5165\u60A8\u7684\u5BC6\u7801",
      modelValue: $data.userform.password1
    }),
    aF: common_vendor.p({
      label: "\u786E\u8BA4\u5BC6\u7801",
      name: "name"
    }),
    aG: common_vendor.p({
      modelValue: $data.userform,
      ["label-position"]: "left"
    }),
    aH: common_vendor.o(($event) => $options.userEdit()),
    aI: common_vendor.sr("userRe", "c7f3f8e6-35"),
    aJ: common_vendor.p({
      ["background-color"]: "#fff"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/fancy/\u5DE5\u8BAD\u4E2D\u5FC3\u5DE5\u5177\u7BA1\u7406/Tool_manage_BUAA/TTools/TTools/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
