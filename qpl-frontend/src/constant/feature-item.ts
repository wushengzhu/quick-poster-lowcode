export interface IFeatureItem {
  logo: string,
  name: string,
  detail: string,
}

export const featureItems: Array<IFeatureItem> = [
  { logo: 'icon-h5', name: '专注H5 始终如一', detail: '三年保持行业领先' },
  { logo: 'icon-moban', name: '海量 H5 模版', detail: '一键生成，一分钟轻松制作' },
  { logo: 'icon-wmty', name: '极致体验', detail: '用户的一致选择' },
]