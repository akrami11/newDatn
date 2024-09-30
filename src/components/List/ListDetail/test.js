// <Row key={i}>
//   <Col restore={newRestored} disable>
//     {i + 1}
//   </Col>
//   <Col restore={newRestored} disable>
//     {data.ID}
//   </Col>
//   <Col
//     restore={newRestored}
//     handleChangeValue={(val) => handleChange(val, 'Name')}
//   >
//     {data.Name}
//   </Col>
//   <Col
//     restore={newRestored}
//     handleChangeValue={(val) => handleChange(val, 'DateOfBirth')}
//   >
//     {getTimeFromDate(data.DateOfBirth)}
//   </Col>
//   <Col
//     restore={newRestored}
//     type='checkBox'
//     boxID={data.ID}
//     handleChangeValue={(val) => handleChange(val, 'Sex')}
//   >
//     {data.Sex}
//   </Col>
//   <Col
//     restore={newRestored}
//     handleChangeValue={(val) => handleChange(val, 'Address')}
//   >
//     {data.Address}
//   </Col>
//   <Col
//     restore={newRestored}
//     handleChangeValue={(val) => handleChange(val, 'Phone')}
//   >
//     {data.Phone}
//   </Col>
//   <Col
//     restore={newRestored}
//     handleChangeValue={(val) => handleChange(val, 'CivilID')}
//   >
//     {data.CivilID}
//   </Col>
//   <Col
//     restore={newRestored}
//     handleChangeValue={(val) => handleChange(val, 'Luong')}
//   >
//     {data.Luong}
//   </Col>
//   <Col
//     restore={newRestored}
//     handleChangeValue={(val) => handleChange(val, 'WorkShift')}
//   >
//     {data.WorkShift}
//   </Col>
//   <Col
//     restore={newRestored}
//     act={newData.ID ? true : false}
//     disable
//     onClick={() => handleClickActionIcon(data.ID)}
//   >
//     {''}
//   </Col>
// </Row>
