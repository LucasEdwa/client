import { User } from "../components/User";

export const UserPage = () => {
    return (
        <div className="container">
            <div className="main-body">


                <div className=" lg:flex lg:justify-around lg:items-center">
                    <div className="col-md-4 mb-3 lg:items-center">
                        <div className="card">
                            <div className="p-10">
                                <User />
                            </div>
                        </div>
                    </div>
                    <div className="lg:items-center lg:flex lg:flex-col lg:mt-20">
                        <div className="card mb-3 ">
                            <div className="">
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Full Name</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        Kenneth Valdez
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        fip@jukmuh.al
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Phone</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        (239) 816-9029
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Mobile</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        (320) 380-4539
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        Bay Area, San Francisco, CA
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-12">
                                        <a className="btn btn-info" target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row gutters-sm">
                            <div className="col-sm-6 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">assignment</i>Donation History</h6>
                                        <small>Donation 1</small>
                                        <div className="progress mb-3" style={{ height: "5px" }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "80%" }} aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}></div>
                                        </div>
                                        <small>Donation 2</small>
                                        <div className="progress mb-3" style={{ height: "5px" }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "72%" }} aria-valuenow={72} aria-valuemin={0} aria-valuemax={100}></div>
                                        </div>
                                        <small>Donation 3</small>
                                        <div className="progress mb-3" style={{ height: "5px" }}>
                                            <div className="progress-bar bg-primary" role="progressbar" style={{ width: "89%" }} aria-valuenow={89} aria-valuemin={0} aria-valuemax={100}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};
