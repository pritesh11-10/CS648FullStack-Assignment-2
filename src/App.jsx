const initialProducts = [
    {
    id: 1, 
    product_name: 'Blue Shirt', 
    price: "16.99", 
    Category: 'Shirts',
    image:'https://picsum.photos/200/300',
    },
    {
        id: 2, 
        product_name: 'Logo Hat', 
        price: "12.99", 
        Category: 'Accessories',
        image:'https://picsum.photos/200/300',
    },
    {
        id: 3, 
        product_name: 'Regular Fit Jeans', 
        price: "10.99", 
        Category: 'Jeans',
        image:'https://picsum.photos/200/300',
    },
    ];


class ProductTable extends React.Component {
    
    render() {
        const ProductRows = this.props.products.map(product => 
        <ProductRow key={product.id} product={product}/>);
        return (
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {ProductRows}
                </tbody>
            </table>
        );
    }
}

class ProductRow extends React.Component {
    render() {
        const product = this.props.product;
        return (
            <tr>
                <td>{product.id}</td>
                <td>{product.product_name}</td>
                <td>$ {product.price}</td>
                <td>{product.Category}</td>
                <td><a href={product.image} target="_blank">View</a></td>
                {/* <td>{product.image}</td> */}
            </tr>
        );
    }
}

class ProductAdd extends React.Component {
    constructor() {
        super();
        this.state = {
            Price: '$',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.productAdd;
        const product = {
        Category: form.Category.value, price: this.state.Price.substring(1),
        product_name: form.product_name.value, image: form.IURL.value
        }
        this.props.createProduct(product);
        form.Category.value = ""; form.Price.value = "";
        form.product_name.value=""; form.IURL.value="";
    }

    handlePriceChange(event) {
        const priceWithoutDollar = event.target.value.substring(1); // Getting value without '$'
        this.setState({ Price: `$${priceWithoutDollar}` })
    }

    render() {
        return (
            <form name="productAdd" className="entire-form" onSubmit={this.handleSubmit}>
                <div className="input-row">
                    <div className="form-item">
                        <label for="Category">Category:</label>
                        <select name="Category" placeholder="Category">
                            <option value="Shirts">Shirts</option>
                            <option value="Jeans">Jeans</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Shorts">Shorts</option>
                        </select>
                    </div>  
                    <div className="form-item">
                        <label for="Price">Price Per Unit:</label>
                        <input type="text" name="Price" value={this.state.Price} onChange={this.handlePriceChange} placeholder="Price" />
                    </div>
                </div>
                <br></br>
                <div className="input-row">
                    <div className="form-item">
                        <label for="Product name">Product Name:</label>
                        <input type="text" name="product_name" placeholder="Product Name" />
                    </div>
                    <div className="form-item">
                        <label for="image">Image URL:</label>
                        <input type="text" name="IURL" placeholder="image" />
                    </div>
                </div>
                <br></br>
                <button>Add Product</button>
            </form>
        );
    }
}

class ProductList extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
        this.createProduct = this.createProduct.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        setTimeout(() => {
        this.setState({ products: initialProducts });
        }, 500);
    }

    createProduct(product) {
        product.id = this.state.products.length + 1;
        const newProductsList = this.state.products.slice();
        newProductsList.push(product);
        this.setState({ products: newProductsList });
    }

    
    render() {
        return (
            <React.Fragment>
                <h1>My Company Inventory</h1>
                <p>Showing all available products</p>
                <hr />
                <ProductTable products={this.state.products}/>
                <p>Adding new product to inventory</p>
                <hr />
                <ProductAdd createProduct={this.createProduct}/>
            </React.Fragment>
        );
    }
}

const element = <ProductList />;
ReactDOM.render(element, document.getElementById('contents'));