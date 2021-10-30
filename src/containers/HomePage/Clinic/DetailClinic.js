import DoctorSchedule from '../Patient/Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Patient/Doctor/DoctorExtraInfo';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import ProfileDoctor from '../Patient/Doctor/ProfileDoctor';
import {
  getAllCodeService,
  getAllDetailClinicById,
  getAllClinic,
} from '../../../services/userService';
import { withRouter } from 'react-router';
import _ from 'lodash';
import { LANGUAGES } from '../../../utils';

class DetailClinic extends Component {
  state = {
    arrDoctorId: [],
    dataDetailClinic: {},
    dataClinic: [],
    image: '',
  };

  async componentDidMount() {
    let id = this.props.match?.params?.id;
    console.log(`id`, id);
    if (this.props.match?.params?.id) {
      let res = await getAllDetailClinicById({
        id: id,
      });

      if (res && !_.isEmpty(res.data.data)) {
        let data = res.data.data;
        console.log(`data`, data);
        let arrDoctorId = [];
        let arr = data.doctorClinic;
        if (arr?.length > 0) {
          arr.map((item) => {
            arrDoctorId.push(item.doctorId);
          });
        }
        this.setState({
          dataDetailClinic: data,
          arrDoctorId,
        });
      }
    }

    //* get image background
    let resALLdata = await getAllClinic();
    if (resALLdata?.data?.errorCode === 0) {
      console.log(`resALLdata`, resALLdata, id);
      let image = resALLdata.data.data.find((item) => {
        return +item.id === +id;
      })?.image;

      this.setState({ dataClinic: resALLdata.data.data, image });
    }
  }

  render() {
    const { arrDoctorId, dataDetailClinic, image } = this.state;
    const { language } = this.props;
    console.log(`this.state`, this.state);
    return (
      <>
        <HomeHeader />
        <div className="container-fluid background-clinic">
          <div className="detail-Clinic container bg-white">
            <div
              className="row background-image"
              style={{
                backgroundImage: `url(${image}`,
                background: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '200px',
                // width: '100%',
              }}></div>
            <div
              className="description my-2"
              dangerouslySetInnerHTML={{
                __html: dataDetailClinic?.descriptionHTML,
              }}></div>
          </div>
          <div className="container">
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
  connect(mapStateToProps, mapDispatchToProps)(DetailClinic)
);
