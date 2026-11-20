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


## Lab 4 Exercise 1.2

Phân công dự kiến: Ex1.2 chuẩn bị app, Ex1.2.1 phụ trách router, layout và navigation, Ex1.2.2 phụ trách People master–detail. Kiểm tra responsive và production áp dụng cho cả app.

| Mốc | Phạm vi | Công việc | Tiêu chí hoàn thành |
| --- | --- | --- | --- |
| 1. Setup | Ex1.2 | Khởi tạo Vite, React 19 và TypeScript trực tiếp trong `ex1.2_lab4_web`. Cài React Router 7. | Thư mục app có lockfile và dev server khởi động được. |
| 2. Router | Ex1.2.1 | Khai báo tuyến gốc, danh sách People, chi tiết theo ID và tuyến 404. | Các URL hoạt động khi điều hướng, mở trực tiếp và tải lại. |
| 3. Layout và navigation | Ex1.2.1 | Tạo layout dùng chung với điều hướng và vùng hiển thị nội dung tuyến. | Điều hướng hiển thị mục hiện tại và dùng được bằng bàn phím. |
| 4. People master–detail | Ex1.2.2 | Tạo danh sách và chi tiết dùng chung dữ liệu. Liên kết từng hồ sơ theo ID, có đường quay về danh sách và thông báo cho ID sai. | Mở hồ sơ từ danh sách và deep link, quay lại danh sách, xử lý đúng ID sai. |
| 5. Responsive và kiểm tra | Ex1.2.1, Ex1.2.2 | Kiểm tra bố cục desktop/mobile, bàn phím, điều hướng, type check, production build và Vite preview. | Nội dung và điều hướng dùng được ở cả hai kích thước. Type check, build và các luồng chính trên preview đạt. |

Trạng thái Ex1.2.1: đã khởi tạo app, triển khai Home (`/`) và About (`/about`) trong layout dùng chung. Navigation dùng `NavLink` với kiểu hiển thị riêng cho link hiện tại và khi focus bằng bàn phím. Các tuyến People và kiểm tra responsive thuộc các bước tiếp theo.
