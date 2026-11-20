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

Trạng thái Ex1.2: đã triển khai Home, About, People master–detail và xử lý URL không khớp trong layout dùng chung.

### Kết quả kiểm tra Ex1.2.2

| Hạng mục | Kết quả |
| --- | --- |
| Type check và production build | Đạt với `npm.cmd run build`. |
| Vite preview và mở URL trực tiếp | HTTP 200 cho `/`, `/about`, `/people`, `/people/minh-anh`, `/people/id-sai` và `/url-sai`. Vite trả HTML của SPA cho các URL này. |
| Nội dung tuyến và link active | Kiểm tra render bằng React Router đạt cho Home, About, lời nhắc chọn người, chi tiết đúng ID, ID sai và URL sai. People vẫn active trên các tuyến chi tiết. |
| Back/Forward | Đạt với lịch sử của React Router trong bộ nhớ khi chuyển giữa hai hồ sơ. Chưa thử nút Back/Forward trong Chrome. |
| Responsive | CSS production có grid hai cột trên desktop, một cột từ 640px trở xuống. Thứ tự trong HTML là danh sách trước, chi tiết sau. Chưa kiểm tra cuộn ngang hoặc thao tác bàn phím trực tiếp trong trình duyệt. |
| Ảnh minh chứng | Chưa có. Công cụ điều khiển trình duyệt không kết nối được với Chrome. |

## Lab 4 Exercise 1.3 — Legacy Validation Anti-Patterns

Thư mục `ex1.3_lab4_web` đang trống. Đây là WBS dự kiến theo sáu mốc được giao. Trường nhập, quy tắc validation và anti-pattern cụ thể sẽ được đối chiếu với ảnh đề trước khi triển khai.

| Mốc | Công việc | Tiêu chí hoàn thành |
| --- | --- | --- |
| 1. Setup | Đối chiếu ảnh đề và chuẩn bị app Vite, React 19 và TypeScript trực tiếp trong `ex1.3_lab4_web` theo quy ước dự án. | Xác định trường nhập, quy tắc validation, anti-pattern cần tái hiện và lệnh chạy demo. |
| 2. Form legacy | Dựng form và tái hiện đúng luồng validation legacy theo đề. Chuẩn bị dữ liệu hợp lệ và không hợp lệ để chạy lại. | Có thể tái hiện kết quả validation ở từng kịch bản đã định. |
| 3. Trace render | Ghi trình tự thao tác, render và lần chạy validation khi nhập, đổi focus và submit theo các kịch bản áp dụng. Phân biệt render với commit khi đọc trace. | Có trace lặp lại được và chỉ rõ thao tác nào dẫn đến render hoặc validation bổ sung. |
| 4. Kiểm tra rủi ro | Dùng trace để kiểm tra lỗi hiển thị sai thời điểm, trạng thái lỗi cũ và render lặp nếu xuất hiện. | Mỗi phát hiện có bước tái hiện, kết quả quan sát và ảnh hưởng. Ghi rõ các trường hợp chưa xác minh. |
| 5. Form cải tiến | Dựng bản cải tiến theo đề với cùng trường nhập và quy tắc validation. Kiểm tra cả dữ liệu đúng, dữ liệu sai và việc sửa lỗi. | Các kịch bản của form legacy chạy lại được trên bản cải tiến để đối chiếu. |
| 6. So sánh và demo | Chạy hai form với cùng dữ liệu và trình tự thao tác. Đối chiếu thông báo lỗi, hành vi submit và trace render. Chạy type check, production build và preview. | Có bảng so sánh dựa trên kết quả thực tế, lệnh chạy demo và ghi chú cho các mục chưa kiểm tra. |

### Trace Legacy khi gõ một ký tự

Đo trên React 19.3.1 ở chế độ development, bật `StrictMode`, dùng Vite để nạp module và jsdom để phát sự kiện `input`. Đợi mount và các effect ban đầu ổn định, xóa log của lượt mount, đặt lại bộ đếm Profiler, rồi nhập `A` vào ô Tên còn trống khi form chưa được submit.

| Commit của Profiler | Lượt gọi render trước commit | Effect sau commit |
| --- | --- | --- |
| 1 | 4 | Đồng bộ Tên lên cha. |
| 2 | 6 | Validate các trường, sau đó kiểm tra submit đang chờ và thoát. |
| 3 | 6 | Tính form validity. |
| 4 | 6 | Kiểm tra submit đang chờ và thoát. |

Tổng cộng 22 lượt gọi render (8 của `SimpleForm`, 8 của ô Tên, 6 của ô Email), 5 lượt chạy effect và 4 commit pha `update`. Effect đồng bộ lỗi xuống con và effect cuộn không chạy trong kịch bản này. Trace dùng console và callback của Profiler, không thêm React state phục vụ ghi log. Chưa đo trong Chrome.

Đã kiểm tra thêm hai tình huống trong cùng môi trường. Nhập nhanh 5 ký tự ghi nhận 46 lượt gọi render, 22 lượt chạy effect và 8 commit. Submit email sai ghi nhận 12 lượt gọi render, 4 lượt chạy effect và 2 commit, với một lời gọi cuộn đến ô Email. Validation đồng bộ chưa tái hiện race condition hay vòng lặp cập nhật. Xem `ex1.3_lab4_web/README.md` để biết luồng effect và phân tích rủi ro.

### Kết quả kiểm tra cuối Ex1.3

| Hạng mục | Kết quả |
| --- | --- |
| Form cải tiến và demo | Đã triển khai công tắc Legacy/Refactored, quy tắc validation dùng chung và bảng so sánh. |
| So sánh Profiler | Nhập `A` sau khi từng form mount ổn định cho 4 commit ở Legacy và 1 ở Refactored. Đo trong React 19.3.1 development, StrictMode và jsdom. Chưa đo commit production. |
| Type check, build và preview | Type check và production build đạt. Vite preview trả HTTP 200 cho HTML và JavaScript. |
| Kiểm tra form trên production bundle | Cả hai bản đạt kiểm thử jsdom cho submit trống, email sai, sửa dữ liệu, nhập nhanh và submit hợp lệ. Khi submit sai, focus và lời gọi cuộn đến đúng trường lỗi đầu tiên. |
| Label, bàn phím và bố cục | Xác minh liên kết label–input, thứ tự focus trong DOM và focus sau submit sai. Chưa thử Tab, chuyển động cuộn hoặc bố cục desktop và 375 px trực tiếp trong Chrome. |
| Ảnh minh chứng | Chưa lưu được ảnh hai form hoặc Profiler vì công cụ điều khiển Chrome không kết nối được. |
