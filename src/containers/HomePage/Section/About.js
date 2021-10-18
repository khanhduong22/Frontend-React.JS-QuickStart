import React, { Component } from 'react';
import { connect } from 'react-redux';

import './About.scss';

class About extends Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <div className="row about">
        <div className="row about-title">Truyền thông nói về BookingCare</div>
        <div className="row">
          <div className="col">
            {/* ifram youtube */}
            <iframe
              width="570"
              height="321"
              src="https://www.youtube.com/embed/FyDQljKtWnI"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
          <div className="col">
            Hãy cùng đón xem:
            <br /> 📺 Chương trình Quốc gia khởi nghiệp
            <br />
            🎬 Phát sóng vào 20:10 tối thứ 6 hàng tuần
            <br />
            📺 Chương trình Cà phê khởi nghiệp
            <br />
            🎬 Phát sóng vào lúc 06:55 sáng thứ 2 đến thứ 6 hàng tuần trên kênh
            VTV1, Đài truyền hình Việt Nam
            <br />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
