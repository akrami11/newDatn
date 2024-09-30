const getFieldName = (val) => {
  switch (val) {
    case 'firstName':
      return 'Tên';
    case 'lastName':
      return 'Họ đệm';
    case 'dateOfBirth':
      return 'Ngày sinh';
    case 'sex':
      return 'Giới tính';
    case 'address':
      return 'Địa chỉ';
    case 'phone':
      return 'Số điện thoại';
    case 'civilID':
      return 'Số căn cước';
    case 'salary':
      return 'Lương';
    case 'shift':
      return 'Ca làm việc';
    case 'level':
      return 'Chức vụ';
    case 'image':
      return 'Ảnh';
    case 'username':
      return 'Tài khoản';
    case 'password':
      return 'Mật khẩu';
    case 'name':
      return 'Tên chương';
    case 'description':
      return 'Mô tả';
    case 'tag':
      return 'Thể loại';
    case 'price':
      return 'Giá';
    case 'quantity':
      return 'số lượng';
    case 'sale':
      return 'Giảm giá';
    case 'PRID':
      return 'Mã tác giả';
    case 'LID':
      return 'Mã truyện chữ';
    case 'AuthorID':
      return 'Mã tác giả';
    case 'email':
      return 'Email';
    case 'volume':
      return 'Phần';
    case 'chapter':
      return 'Chương';
    case 'content':
      return 'Nội dung';
    case 'views':
      return 'Lượt xem';
    case 'hide':
      return 'Ẩn';
    case 'file':
      return 'Bản ghi';

    default:
      return val;
  }
};
export default getFieldName;
