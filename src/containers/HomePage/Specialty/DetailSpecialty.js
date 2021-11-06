import DoctorSchedule from '../Patient/Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Patient/Doctor/DoctorExtraInfo';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import ProfileDoctor from '../Patient/Doctor/ProfileDoctor';
import {
  getAllCodeService,
  getAllDetailSpecialtyById,
  getAllSpecialty,
} from '../../../services/userService';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailSpecialty extends Component {
  state = {
    arrDoctorId: [],
    dataDetailSpecialty: {},
    listProvince: [],
    dataSpecialty: [],
    image: '',
  };

  async componentDidMount() {
    let id = this.props.match?.params?.id;
    if (this.props.match?.params?.id) {
      let res = await getAllDetailSpecialtyById({
        id: id,
        location: 'ALL',
      });

      let resProvince = await getAllCodeService('PROVINCE');

      if (res && !_.isEmpty(res.data.data)) {
        let data = res.data.data;
        let arrDoctorId = [];
        let arr = data.doctorSpecialty;
        if (arr?.length > 0) {
          arr.forEach((item) => {
            arrDoctorId.push(item.doctorId);
          });
        }

        let dataProvince = resProvince.data.data;
        if (dataProvince?.length > 0) {
          dataProvince.unshift({
            createdAt: null,
            keyMap: 'ALL',
            type: 'PROVINCE',
            valueEn: 'ALL',
            valueVi: 'Toàn quốc',
          });
        }

        this.setState({
          dataDetailSpecialty: data,
          arrDoctorId,
          listProvince: dataProvince,
        });
      }
    }

    //* get image background
    let res = await getAllSpecialty();
    if (res?.data?.errorCode === 0) {
      let image = res.data.data.find((item) => {
        return item.id === +id;
      }).image;

      this.setState({ dataSpecialty: res.data.data, image });
    }
  }

  handleOnChangeSelect = async (event) => {
    console.log(`event.target.value`, event.target.value);
    let id = this.props.match?.params?.id;
    if (this.props.match?.params?.id) {
      let res = await getAllDetailSpecialtyById({
        id: id,
        location: event.target.value,
      });

      if (res && !_.isEmpty(res.data.data)) {
        let data = res.data.data;
        let arrDoctorId = [];
        let arr = data.doctorSpecialty;
        if (arr?.length > 0) {
          arr.forEach((item) => {
            arrDoctorId.push(item.doctorId);
          });
        }

        this.setState({
          dataDetailSpecialty: data,
          arrDoctorId,
        });
      }
    }
  };

  render() {
    const { arrDoctorId, dataDetailSpecialty, listProvince, image } =
      this.state;
    const { language } = this.props;
    console.log(`this.state`, this.state);
    return (
      <>
        <HomeHeader />
        <div className="container-fluid background-specialty">
          <div className="detail-specialty container">
            <div
              className="row background-image"
              style={{
                backgroundImage: `url(${image}`,
                background: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                // height: '100%',
                // width: '100%',
              }}>
              {/* <div
                className="background-image"
                style={{
                  backgroundImage: `url(${image}`,
                  background: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  height: '100%',
                  width: '100%',
                }}> */}
              <div
                className="description border border-3"
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty?.descriptionHTML,
                }}></div>
              {/* </div> */}
            </div>

            <div className="search-doctor col-3 mt-2">
              <select
                className="form-select"
                onChange={(event) => this.handleOnChangeSelect(event)}>
                {listProvince?.length > 0 &&
                  listProvince.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            {arrDoctorId &&
              arrDoctorId.map((item, index) => {
                return (
                  <div className="each-doctor row form-group border rounded my-2">
                    <div className="col-7 content-left">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescription={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                        //   dataTime={dataForBookingModal}
                      />
                    </div>
                    <div className="col-5 content-right my-2" key={index}>
                      <DoctorSchedule doctorIdFromParent={item} />
                      <DoctorExtraInfo doctorIdFromParent={item} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty)
);
