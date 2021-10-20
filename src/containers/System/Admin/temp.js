<div>
  <div className="mt-4">
    <table className="table table-hover">
      <thead className="table-info">
        <tr>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>item</td>
          <td>item</td>
          <td>item</td>
          <td>item</td>
          <td className="action-row">
            <div className="action-edit mx-2">
              <button
                className="btn btn-outline-warning "
                // onClick={() => this.handleOnEditIcon(item)}
              >
                <i className="fas fa-edit"></i>
              </button>
            </div>
            <div className="action-delete mx-2">
              <button
                className="btn btn-outline-danger"
                //   onClick={() => this.handleOnDeleteIcon(item)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>;


.action-row {
    display: flex;
    justify-content: center;
  }
  