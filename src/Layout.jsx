function Layout(props) {
    // eslint-disable-next-line react/prop-types
    const {children} = props;
    return (
        <>
            <div className="row h-100">
                <div className="col-2 bg-primary">
                    Navbar
                </div>
                <div className="col-10 bg-success vh-100">
                    <div className="row">
                        <div className="col bg-danger">
                            Header
                        </div>
                    </div>
                    <div className="row">
                        <div className="col bg-success">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout;