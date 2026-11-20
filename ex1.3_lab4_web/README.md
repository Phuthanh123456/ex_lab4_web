# Ex1.3 — Legacy Validation Anti-Patterns

Chạy `npm.cmd ci`, rồi `npm.cmd run dev` trong thư mục bài. Mở Console ở chế độ development để xem log render, effect và commit. Đợi form mount ổn định, xóa log cũ và đặt lại bộ đếm bằng `console.countReset('[Legacy Profiler] commits')` trước mỗi lượt đo.

## Luồng Legacy

1. `InputField` đồng bộ giá trị cục bộ lên `SimpleForm`.
2. Cha validate các trường khi giá trị thay đổi.
3. Cha tính form validity từ kết quả validation.
4. Con sao chép lỗi từ prop vào state hiển thị.
5. Sau submit thất bại, con focus và cuộn tới trường lỗi đầu tiên khi lỗi đã hiển thị.

## Kết quả đo

React 19.3.1 development, bật `StrictMode`, nạp module qua Vite và phát sự kiện DOM bằng jsdom. Mỗi lượt dùng form mới và loại log lúc mount. Số render đếm lượt gọi hàm component, còn số commit lấy từ Profiler.

| Tình huống | Render | Effect | Commit | Quan sát |
| --- | ---: | ---: | ---: | --- |
| Gõ `A` vào ô Tên trống | 22 | 5 | 4 | Đồng bộ giá trị, validation và tính validity tạo các đợt cập nhật riêng. Form chưa submit nên không hiện lỗi hoặc cuộn. |
| Phát liên tiếp 5 sự kiện nhập vào ô Tên | 46 | 22 | 8 | Giá trị cuối là `Anhax`. Có 4 commit pha `nested-update`, nhiều lần validate lại và không có lời gọi cuộn. |
| Submit sau khi nhập tên hợp lệ và email sai định dạng | 12 | 4 | 2 | Lỗi email được sao chép xuống con. Effect cuộn kiểm tra hai lần và gọi cuộn đúng một lần. Dòng log thực hiện cuộn nằm bên trong lần chạy effect cuối. |

## Rủi ro

- **Đã quan sát:** Một thao tác nhập có thể tạo nhiều lượt render, effect và commit. Khi submit lỗi, trạng thái lỗi phải qua một lượt đồng bộ xuống con trước khi cuộn.
- **Race condition:** Validation hiện chạy đồng bộ nên không tái hiện race. Nếu thêm validation bất đồng bộ, kết quả của giá trị cũ có thể trả về sau kết quả của giá trị mới và ghi đè lỗi hoặc validity hiện tại. Có thể hủy lượt cũ hoặc chỉ áp dụng kết quả có request ID khớp với lượt mới nhất.
- **Vòng lặp cha–con:** Ví dụ cha tạo callback mới mỗi render, còn effect của con phụ thuộc vào callback đó và gọi nó để cập nhật cha bằng một object mới. Cập nhật cha tạo callback mới, kích hoạt lại effect con và có thể dẫn đến `Maximum update depth exceeded`. Không quan sát thấy vòng lặp này trong ba kịch bản đã đo.

Type check và production build: `npm.cmd run build`. Kiểm tra cuộn ở đây xác minh lời gọi DOM trong jsdom.

## Đối chiếu với Refactored

Dùng cùng một Profiler trong cùng phiên React 19.3.1 development, StrictMode và jsdom. Chọn từng bản, đợi mount ổn định và đặt lại bộ đếm tương ứng (`[Legacy Profiler] commits` hoặc `[Refactored Profiler] commits`). Nhập đúng một ký tự `A` vào ô Tên trống khi cả hai trường còn trống và form chưa submit. Legacy ghi **4 commit**, Refactored ghi **1 commit** trong lượt đo này.

Refactored giữ giá trị ở cha, truyền giá trị và lỗi xuống qua props, đồng thời tính lỗi và validity bằng hàm thuần. Luồng này bỏ các effect đồng bộ giá trị lên cha, validate sau commit, tính validity sau commit và sao chép lỗi xuống con. Focus và cuộn chạy trong handler submit sai. Trong lượt gõ kể trên, Legacy chạy ba bước đầu, còn bước sao chép lỗi và cuộn chưa được kích hoạt.

## Kiểm tra cuối

- Type check và production build đạt. Vite preview trả HTTP 200 cho HTML và JavaScript.
- Kiểm thử production bundle trong jsdom đạt cho cả hai bản: submit trống, email sai định dạng, sửa dữ liệu, nhập nhanh và submit hợp lệ. Khi submit sai, form focus và gọi cuộn đến trường lỗi đầu tiên. Nhập và sửa không gọi cuộn.
- Hai label liên kết đúng với input. Đã kiểm tra thứ tự phần tử có thể nhận focus trong DOM và gọi focus lần lượt. Chưa thử phím Tab, chuyển động cuộn hoặc bố cục desktop và 375 px trong Chrome.
- Số commit ở bảng so sánh được đo bằng Profiler trong development. Production được kiểm thử hành vi riêng và chưa đo commit. Chưa có ảnh minh chứng vì công cụ điều khiển Chrome không kết nối được.

Chạy demo bằng `npm.cmd run dev`. Để xem bản production, chạy `npm.cmd run build` rồi `npm.cmd run preview`.
