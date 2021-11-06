import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../../HomePage/HomeHeader';
import { withRouter } from 'react-router';

import { getDetailDoctorInfo } from '../../../../services/userService';

import './DetailDoctor.scss';
import { LANGUAGES } from '../../../../utils';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfo from './DoctorExtraInfo';

import LikeAndShare from '../../SocialPlugin/LikeAndShare';
import Comment from '../../SocialPlugin/Comment';

class DetailDoctor extends Component {
  state = {
    doctorDetail: {},
  };

  async componentDidMount() {
    let id = this.props.match?.params?.id;
    if (this.props.match?.params?.id) {
      let res = await getDetailDoctorInfo(id);
      this.setState({ doctorDetail: res.data.data });
      console.log(`res`, res);
    }
  }

  render() {
    const { doctorDetail } = this.state;
    const { language } = this.props;
    let nameVi = '';
    let nameEn = '';
    if (doctorDetail?.positionData) {
      nameVi = `${doctorDetail.positionData.valueVi}, ${doctorDetail.lastName} ${doctorDetail.firstName}`;
      nameEn = `${doctorDetail.positionData.valueEn}, ${doctorDetail.firstName} ${doctorDetail.lastName}`;
    }

    let currentURL =
      process.env.REACT_APP_IS_LOCALHOST === 1
        ? 'link-to-herokuapp'
        : window.location.href;
    console.log(`currentURL`, currentURL);

    return (
      <>
        <HomeHeader isBannerShow={false} />
        <div className="container mt-2 doctor-detail">
          <div className="row intro-doctor">
            <div className="col-2 content-left">
              <div
                className="avatar"
                style={{
                  backgroundImage: `url(${doctorDetail?.image})`,
                }}></div>
            </div>
            <div className="col-10 content-right text-start">
              <div className="row up fw-bold fs-5 text-uppercase">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="row down mt-auto text-start">
                {doctorDetail?.Markdown?.contentHTML && (
                  <span>{doctorDetail?.Markdown?.description}</span>
                )}

                <div className="like-share-plugin">
                  <LikeAndShare dataHref={currentURL} />
                </div>
              </div>
            </div>
          </div>
          <div className="row schedule-doctor mt-4">
            <div className="col-7 content-left justify-content-start">
              <DoctorSchedule
                doctorIdFromParent={
                  doctorDetail && doctorDetail.id ? doctorDetail.id : -1
                }
              />
            </div>
            <div className="col-5 content-right">
              <DoctorExtraInfo
                doctorIdFromParent={
                  doctorDetail && doctorDetail.id ? doctorDetail.id : -1
                }
              />
            </div>
          </div>
          <hr />
          <div className="row detail-info-doctor">
            {doctorDetail?.Markdown?.contentHTML && (
              <div
                className="text-start mt-4"
                dangerouslySetInnerHTML={{
                  __html: doctorDetail?.Markdown?.contentHTML,
                }}></div>
            )}
          </div>
          <div className="comment-doctor">
            <Comment dataHref={currentURL} width={'100%'} />
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

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DetailDoctor)
);
