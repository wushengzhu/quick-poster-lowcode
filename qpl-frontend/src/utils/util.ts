export class Util {
  /**
   * 判断是否为undefined或Null
   */
  static isUndefinedOrNull(obj: any): boolean {
    return typeof obj === 'undefined' || obj === null
  }
  /**
   * 判断是否为undefined、null或仅有空白字符
   */
  static isNullOrWhiteSpace(str: string | undefined | null): boolean {
    return typeof str === 'undefined' || str === null || /^\s*$/.test(str)
  }
  /**
   * 判断是否为0或空白字符等
   */
  static isZeroOrWhiteSpace(str: string | number | undefined | null): boolean {
    if (typeof str === 'undefined' || str === null) {
      return true
    } else if (typeof str === 'string') {
      return /^\s*$/.test(str) || str === '0'
    } else if (typeof str === 'number') {
      return str === 0
    }
    return false
  }

  static isMobile(value: string, onlyMobile: boolean = false): boolean {
    let regExp
    /**
     * 移动号段：
     * 134 135 136 137 138 139 147 148 150 151 152 157 158 159 172 178 182 183 184 187 188 195 198
     * 联通号段：
     * 130 131 132 145 146 155 156 166 175 176 185 186 196
     * 电信号段：
     * 133 149 153 173 174 177 180 181 189 191 193 199
     * 虚拟运营商:
     * 162 165 167 170 171
     * 广电:
     * 190 192 197
     */
    if (onlyMobile) {
      regExp = new RegExp(
        /^((13[0-9])|(14[5-9])|(15[0-3,5-9])|(16[2,5-7])|(17[0-8])|(18[0-9])|(19[0-3])|(19[5-9]))\d{8}$/
      )
    } else {
      regExp = new RegExp(
        /^((0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$|^((13[0-9])|(14[5-9])|(15[0-3,5-9])|(16[2,5-7])|(17[0-8])|(18[0-9])|(19[0-3])|(19[5-9]))\d{8}$|[1-9]\d{5}$/
      )
    }
    return regExp.test(value)
  }

}