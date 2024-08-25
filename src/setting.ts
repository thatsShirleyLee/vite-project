// 用于项目logo|标题配置
export default {
  title: '电商运营平台', // 项目的标题
  logo: '/logo-circle.svg', // 项目的logo
  // 在开发模式下（vite dev），Vite 会将 public 文件夹中的所有文件直接暴露在根路径下。这意味着 public/logo-circle.svg 文件会被直接映射到 http://localhost:3000/logo-circle.svg
  // 在构建时（vite build），Vite 会将 public 文件夹中的文件复制到 dist 目录的根目录中。因此，/logo-circle.svg 将指向构建后的 dist/logo-circle.svg 文件。
  logoHidden: true, // 是否隐藏logo
}
