import { nextTick } from 'vue'
import { loadCss, loadJs } from './common'

const cssUrls: Array<string> = [
  '//at.alicdn.com/t/c/font_4499540_meupxm0f3g.css', // 阿里图标库cs，每添加一次图标都需要更换
]
const jsUrls: Array<string> = [
  // '//at.alicdn.com/t/c/font_4499540_meupxm0f3g.js'
]
/**
 * 加载预设的字体图标资源
 */
export default function iconInit() {
  if (cssUrls.length > 0) {
    cssUrls.map(v => {
      loadCss(v)
    })
  }

  if (jsUrls.length > 0) {
    jsUrls.map(v => {
      loadJs(v)
    })
  }
}

/**
 * 获取本地自带的图标
 * /src/assets/icons文件夹内的svg文件夹
 */
export function getLocalIconfontNames() {
  return new Promise<string[]>((resolve, reject) => {
    nextTick(() => {
      let iconfonts: string[] = []

      const svgEl = document.getElementById('local-icon')
      if (svgEl?.dataset.iconName) {
        iconfonts = (svgEl?.dataset.iconName as string).split(',')
      }

      if (iconfonts.length > 0) {
        resolve(iconfonts)
      } else {
        reject('No Local Icons!')
      }
    })
  })
}
