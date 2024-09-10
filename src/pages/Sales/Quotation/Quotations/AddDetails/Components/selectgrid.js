import React from "react";


class SelectTableComponent extends React.Component {
    constructor(props) {
        console.log(props);
        super(props);
        //  console.log(props.tcdata);
        let data = props.tcdata.map((t) => {
            t["ID"] = t["TaxID"]
            return t
        })
        this.state = {
            List: data || [],
            MasterChecked: false,
            SelectedList: [],
        };
    }

    // Select/ UnSelect Table rows
    onMasterCheck(e) {
        let tempList = this.state.List;
        // Check/ UnCheck All Items
        tempList.map((tc) => (tc.selected = e.target.checked));

        //Update State
        this.setState({
            MasterChecked: e.target.checked,
            List: tempList,
            SelectedList: this.state.List.filter((e) => e.selected),
        });
    }

    // Update List Item's state and Master Checkbox State
    onItemCheck(e, item, id) {
        let tempList = this.state.List;
        tempList.map((tc, lid) => {
            if (lid === id) {
                tc.selected = e.target.checked;
            }
            return tc;
        });

        //To Control Master Checkbox State
        const totalItems = this.state.List.length;
        const totalCheckedItems = tempList.filter((e) => e.selected).length;

        // Update State
        this.setState({
            MasterChecked: totalItems === totalCheckedItems,
            List: tempList,
            SelectedList: this.state.List.filter((e) => e.selected),
        });
        this.props.selection(this.state.List.filter((e) => e.selected));
        // console.log(this.state.SelectedList);
    }

    // Event to get selected rows(Optional)
    getSelectedRows() {
        this.setState({
            SelectedList: this.state.List.filter((e) => e.selected),
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12" style={{maxHeight:'240px'}}>
                        {/* <table className="custtable">
              <thead> */}
                        <table striped className="table-data border ">
                            <thead className="tableHeaderBGColor">
                                <tr>
                                    {/*<th scope="col" className="custth">Bold
                     <input
                      type="checkbox"
                      className="form-check-input"
                      checked={this.state.MasterChecked}
                      id="mastercheck"
                      onChange={(e) => this.onMasterCheck(e)}
                    /> 
                  </th>*/}
                                    <th >Select</th>
                                    <th style={{textAlign:'center'}}>{this.props.tablename}</th>
                                    {/* <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Website</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.List.map((tc, id) => (
                                    <tr key={tc["ID"]} className={tc.selected ? "selected" : ""} custtr>
                                        {/* <th scope="row" className="custth">
                      <input
                        type="checkbox"
                        checked={tc.selected}
                        className="form-check-input"
                        id='rowcheck{tc["ID"]}'
                        onChange={(e) => this.onItemCheck(e, tc)}
                      />
                    </th> */}
                                        <th className="custth"><input type="checkbox" className="form-check-input" id={id} onChange={(e) => { this.onItemCheck(e, tc, id) }} /></th>
                                        <td className="custth">{tc["Terms"] || tc["TaxName"]}</td>
                                        {/* <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* <button
              className="btn btn-primary"
              onClick={() => this.getSelectedRows()}
            >
              Get Selected Items {this.state.SelectedList.length} 
            </button>
            <div className="row">
              <b>All Row Items:</b>
              <code>{JSON.stringify(this.state.List)}</code>
            </div>
            <div className="row">
              <b>Selected Row Items(Click Button To Get):</b>
              <code>{JSON.stringify(this.state.SelectedList)}</code>
            </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectTableComponent;