import Navbar from "../shared/navbar";

function MainPage () {
    return(
        <div>
            <Navbar/>
            <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
                <h1 className="mb-4">Course Follow-Up</h1>
                <div className="card m-4 text-center" style={{ width: '500px'}}>
                    <div className="card-header">
                        <h2>Bienvenido/a</h2>
                    </div>
                    <div className="card-body">
                        <div className="m-3">
                            <button className="btn btn-primary">Agregar Planificador</button>
                        </div>
                        <div className="m-3">
                            <button className="btn btn-primary">Ver Planificador</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;