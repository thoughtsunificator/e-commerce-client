import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import Datasort from 'react-data-sort'

class ShopPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shopItems: [],
            loading: null,
            sortBy: "name",
            direction: "asc",
            activePage: 0,
            searchQuery: ''
        }
    }

    async componentDidMount() {
        this.setState({ loading: true })
        const fetchText = url => fetch(url).then(r => r.json()); // 1
        const /*2*/[shop, resShopItems] = /*3*/ await Promise.all([
            fetchText(`${process.env.REACT_APP_API_URL}api/shops/${this.props.match.params.shop_id}`),
            fetchText(`${process.env.REACT_APP_API_URL}/shop_items?shop=${this.props.match.params.shop_id}`)
        ]);
        this.setState({ loading: false, shop, shopItems: resShopItems["hydra:member"]});
    }

    addCart(product) {
        this.props.dispatch({
            type: "ADD_PRODUCT",
            product: { ...product, quantity: 1 }
        })
    }

    setSortBy = sortBy => {
        this.setState({ sortBy });
    };

    toggleDirection = () => {
        this.setState({
            direction: this.state.direction === "asc" ? "desc" : "asc"
        });
    };

    goToPage = activePage => {
        this.setState({ activePage });
    };

    prevPage = () => {
        this.setState(({ activePage }) => ({
            activePage: activePage - 1
        }));
    };

    nextPage = () => {
        this.setState(({ activePage }) => ({
            activePage: activePage + 1
        }));
    };

    render() {
        const { sortBy, direction, activePage, searchQuery } = this.state;
        if (this.state.loading === false) {
            if(this.state.shopItems.length >= 1) {
                return (
                    <Datasort
                        data={this.state.shopItems}
                        sortBy={sortBy}
                        direction={direction}
                        activePage={activePage}
                        searchQuery={searchQuery}
                        paginate
                        render={({ data, pages }) => {
                            return (
                                <div>
                                    <Links
                                        setSortBy={this.setSortBy}
                                        sortBy={sortBy}
                                        direction={direction}
                                        toggleDirection={this.toggleDirection}
                                    />
                                    <h2>
                                        {this.state.shop.name}
                                    </h2>
                                    <Content data={data} addCart={this.addCart.bind(this)} />
                                    <Flex style={{ justifyContent: "space-between" }}>
                                        <GoToPage goToPage={this.goToPage} pages={pages} />
                                        <PageIndicator pages={pages} activePage={activePage} />
                                        <Navigation
                                            activePage={activePage}
                                            goToPage={this.goToPage}
                                            nextPage={this.nextPage}
                                            prevPage={this.prevPage}
                                            pages={pages}
                                        />
                                    </Flex>
                                </div>
                            );
                        }}
                    />
                );   
            } else {
                return (
                    "Ce shop n'a pas de produit en vente actuellement"
                )
            }
        } else if(this.state.loading === true) {
            return "Loading..."
        } else {
            return null
        }
    }
}

function Links({ setSortBy, sortBy, direction, toggleDirection }) {
    const columns = [
        { key: "id", title: "ID" },
        { key: "name", title: "Name" },
        { key: "description", title: "Description" },
        { key: "price", title: "Price" },

    ];
    const items = columns.map(({ key, title }) => {
        const active = key === sortBy;
        return (
            <ToggleLink
                key={key}
                active={active}
                onClick={() => {
                    if (active) {
                        toggleDirection();
                    }
                    setSortBy(key);
                }}
            >
                {title} {active ? direction === "asc" ? "▲" : "▼" : null}
            </ToggleLink>
        );
    });
    return (
        <div style={{display: "grid", gridGap: "5px", gridAutoflow: "column"}}>
            <div>Sort by</div>
             {items}
        </div>
    );
}

function ToggleLink({ children, active, onClick }) {
    return (
        <div
            onClick={onClick}
            style={{ fontWeight: active ? "bold" : "normal", cursor: "pointer" }}
        >
            {children}
        </div>
    );
}

function Content({ data, addCart }) {
    return (
        <section id="productList">
            {data.map(({ product }) => (
            <div key={product.id} class="containerProductList">
                <img src='https://fakeimg.pl/100x100/282828/F2F4F3' style={{width: 100, height: 100}} alt={product.name} />
                <h2><Link to={`/product/${product.id}`}>{product.name}</Link></h2>
                <p>{product.description}</p>
                <h3>{product.price} &euro;</h3>
                <button className="addToCart" onClick={() => addCart(product)}><img src="/SVG/basket.svg" style={{width: 15, height: 15}} alt={product.name} />Ajouter au panier</button>
            </div>
            ))}
        </section>
    );
}

function Flex({ children, style }) {
    return <div style={{ display: "flex", ...style }}>{children}</div>;
}

function GoToPage({ goToPage, pages }) {
    const options = [];
    for (let i = 0; i < pages; i++) {
        options.push(<option key={i} value={i}>{i + 1}</option>);
    }
    return (
        <div>
            Go to page{" "}
            <select onChange={e => goToPage(parseInt(e.target.value))}>
                {options}
            </select>
        </div>
    );
}

function Navigation({ activePage = 0, goToPage, nextPage, prevPage, pages }) {
    return (
        <Flex>
            <button disabled={activePage === 0} onClick={() => goToPage(0)}>
                {"<<"}
            </button>
            <button disabled={activePage === 0} onClick={prevPage}>
                {"<"}
            </button>

            <button disabled={activePage === pages - 1} onClick={nextPage}>
                {">"}
            </button>
            <button
                disabled={activePage === pages - 1}
                onClick={() => goToPage(pages - 1)}
            >
                {">>"}
            </button>
        </Flex>
    );
}

function PageIndicator({ pages, activePage = 0}) {
    return (
        <div>
            <b>{activePage + 1}</b> / {pages}
        </div>
    );
}

export default connect()(ShopPage);