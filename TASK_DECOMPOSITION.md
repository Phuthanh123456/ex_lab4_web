## Lab 4 Exercise 1.1

| Mốc | Công việc | Tiêu chí hoàn thành |
| --- | --- | --- |
| 1. Khởi tạo | Tạo app Vite, React 19 và TypeScript, cài React Router 7 | App nằm trực tiếp trong thư mục Ex1.1 và có lockfile |
| 2. App nền | Tạo dữ liệu `Person` dùng chung, danh sách `/` và chi tiết `/people/:id` với static import | Mở được hồ sơ từ danh sách và URL trực tiếp, có thông báo khi ID sai |
| 3. Lazy loading | Refactor tuyến `/people/:id` qua `React.lazy` và import động | Production build sinh chunk riêng cho tuyến Chi tiết |
| 4. Skeleton và accessibility | Dùng skeleton chung bố cục với hồ sơ, vùng thông báo tải, skip link và focus | Tuyến có fallback, điều hướng dùng được bằng bàn phím và trạng thái tải có ngữ nghĩa |
| 5. Kiểm tra production | Kiểm tra kiểu, production build và Vite preview | Build và kiểm tra HTTP đạt. Kiểm tra DevTools còn pending |

### Kết quả kiểm tra production Ex1.1

| Hạng mục | Kết quả |
| --- | --- |
| Type check và production build | Đạt với `npm.cmd run build -- --manifest`. |
| Vite preview | HTTP 200 cho `/`, `/people/minh-anh`, `/people/id-sai` và chunk chi tiết. Các URL tuyến trả HTML của SPA. |
| Chunk chi tiết | Manifest đánh dấu `assets/PersonDetail-B0uy55CH.js` là dynamic entry. Chunk nằm ngoài chuỗi import tĩnh và không được tham chiếu trực tiếp từ HTML. Chưa xác minh thời điểm request khi click trong DevTools Network với cache tắt. |
| Skeleton và accessibility trên desktop/mobile | Chưa kiểm tra trong Chrome với network throttling. Chưa xác nhận trạng thái runtime của `aria-busy` và `aria-live` trong quá trình tải. |
| CLS desktop / mobile | Desktop: chưa đo. Mobile: chưa đo. |
| Layout shift khi đổi skeleton sang nội dung thật | Chưa quan sát bằng Performance trace trên desktop hoặc mobile. |
| Ảnh Network, skeleton và Performance | Chưa có. Công cụ điều khiển trình duyệt không kết nối được với Chrome. |
