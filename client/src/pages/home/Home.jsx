import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

const Home = () => {
    return (
        <div>
            <h1>Mecha Empire</h1>
            <br />

            <h3>Hola, ¿Buscas un producto en específico?</h3>

            <form>
                <label className="form-label" htmlFor="buscarProducto">Buscar Producto:</label>
                <input
                    className="form-control"
                    type="text"
                    name="BuscarProducto"
                    id="buscarProducto"
                />
                <br />

                <label className="form-label" htmlFor="ordenarPor">Ordenar por:</label>
                <select className="form-select" id="ordenarPor">
                    <option>Alfabetico de la A a la Z</option>
                    <option>Alfabetico de la Z a la A</option>
                    <option>Precio más alto a más bajo</option>
                    <option>Precio más bajo a más alto</option>
                    <option>Antigüedad de más nuevo a más viejo</option>
                    <option>Antigüedad de más viejo a más nuevo</option>
                </select>
                <br />

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="radioEjemplo"
                        id="radioEjemplo1"
                    />
                    <label className="form-check-label" htmlFor="radioEjemplo1">
                        Mostrar productos agotados del inventario
                    </label>
                    <br />
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="radioEjemplo"
                        id="radioEjemplo2"
                    />
                    <label className="form-check-label" htmlFor="radioEjemplo2">
                        No mostrar productos agotados del inventario
                    </label>
                    <br />
                </div>

                <br />

                <input
                    className="btn btn-primary"
                    type="submit"
                    name="Buscar"
                    value="Enviar"
                />
            </form>

            <br />

            <h2>Lo más buscado</h2>

            <br />

            <div className="container">
                <div className="row">
                    <div className="card col">
                        <img
                            src="https://m.media-amazon.com/images/I/71p21YOrsIL._AC_SL1500_.jpg"
                            alt="Producto 1"
                        />
                        <div className="card-body">
                            <h4 className="card-title">Card title</h4>
                            <p className="card-text">
                                some quick example text to build on the card title and make up the bulk of the cards content
                            </p>
                            <a className="btn btn-primary" href="">
                                Ir a Producto
                            </a>
                        </div>
                    </div>

                    <div className="card col">
                        <img
                            src="https://images.bigbadtoystore.com/images/p/full/2023/08/8820ca19-bef2-40f0-91fc-924f2eb02b40.jpg"
                            alt="Producto 2"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Card title 2</h5>
                            <p className="card-text">
                                some quick example text to build on the card title and make up the bulk of the cards content
                            </p>
                            <a className="btn btn-primary" href="">
                                Ir a Producto
                            </a>
                        </div>
                    </div>

                    <div className="card col">
                        <img
                            src="https://m.media-amazon.com/images/I/71aQ4hXHDYL._AC_SL1500_.jpg"
                            alt="Producto 3"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Card title 3</h5>
                            <p className="card-text">
                                some quick example text to build on the card title and make up the bulk of the cards content
                            </p>
                            <a className="btn btn-primary" href="">
                                Ir a Producto
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="card col">
                        <img
                            src="https://ciudadmangacr.com/cdn/shop/files/22.500-045557407322_2.jpg?v=1736809576"
                            alt="Producto 4"
                        />
                        <div className="card-body">
                            <h4 className="card-title">Card title 4</h4>
                            <p className="card-text">
                                some quick example text to build on the card title and make up the bulk of the cards content
                            </p>
                            <a className="btn btn-primary" href="">
                                Ir a Producto
                            </a>
                        </div>
                    </div>

                    <div className="card col">
                        <img
                            src="https://m.media-amazon.com/images/I/8146soLva0L.jpg"
                            alt="Producto 5"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Card title 5</h5>
                            <p className="card-text">
                                some quick example text to build on the card title and make up the bulk of the cards content
                            </p>
                            <a className="btn btn-primary" href="">
                                Ir a Producto
                            </a>
                        </div>
                    </div>

                    <div className="card col">
                        <img
                            src="https://m.media-amazon.com/images/I/619kPEO3FwS.jpg"
                            alt="Producto 6"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Card title 6</h5>
                            <p className="card-text">
                                some quick example text to build on the card title and make up the bulk of the cards content
                            </p>
                            <a className="btn btn-primary" href="">
                                Ir a Producto
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <br />

            <div className="container">
                <div className="row">
                    <div className="card col">
                        <img
                            src="https://m.media-amazon.com/images/I/81x-KK-FClL.jpg"
                            alt="Producto 7"
                        />
                        <div className="card-body">
                            <h4 className="card-title">Card title 7</h4>
                            <p className="card-text">
                                some quick example text to build on the card title and make up the bulk of the cards content
                            </p>
                            <a className="btn btn-primary" href="">
                                Ir a Producto
                            </a>
                        </div>
                    </div>

                    <div className="card col">
                        <img
                            src="https://images.ctfassets.net/s5n2t79q9icq/4X7lXtcbz6D2l4uWvsOyEN/b5edede745f4f3602f5c9864e5dcc908/EN_cCcvb37BbshGHpp0.png"
                            alt="Producto 8"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Card title 8</h5>
                            <p className="card-text">
                                some quick example text to build on the card title and make up the bulk of the cards content
                            </p>
                            <a className="btn btn-primary" href="">
                                Ir a Producto
                            </a>
                        </div>
                    </div>

                    <div className="card col">
                        <img
                            src="https://images.ctfassets.net/s5n2t79q9icq/3Bq3bvCF66afvG5jClCycT/d46a117d89f5beec26f5549f054cec92/FIN_MTG_STG_Prerelease.png"
                            alt="Producto 9"
                        />
                        <div className="card-body">
                            <h5 className="card-title">Card title 9</h5>
                            <p className="card-text">
                                some quick example text to build on the card title and make up the bulk of the cards content
                            </p>
                            <a className="btn btn-primary" href="">
                                Ir a Producto
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <br />
            <br />
            <br />
        </div>
    );
};

export default Home;
