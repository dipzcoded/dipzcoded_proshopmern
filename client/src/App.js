import { useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductListScreen from "./screens/ProductListScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";

import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { logout } from "./actions/user";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";

const App = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userData);

  useEffect(() => {
    const token = userInfo?.token;
    if (userInfo && token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        dispatch(logout());
      }
    }
  }, [userInfo, dispatch]);

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/profile" component={ProfileScreen} />
            <Route exact path="/shipping" component={ShippingScreen} />
            <Route exact path="/payment" component={PaymentScreen} />
            <Route exact path="/placeorder" component={PlaceOrderScreen} />
            <Route exact path="/order/:id" component={OrderScreen} />
            <Route exact path="/product/:id" component={ProductScreen} />
            <Route exact path="/cart/:id?" component={CartScreen} />
            <Route exact path="/admin/userlist" component={UserListScreen} />
            <Route
              exact
              path={["/admin/productlist", "/admin/productlist/:pagenumber"]}
              component={ProductListScreen}
            />
            <Route exact path="/admin/orderlist" component={OrderListScreen} />
            <Route
              exact
              path="/admin/user/:id/edit"
              component={UserEditScreen}
            />
            <Route
              exact
              path="/admin/product/:id/edit"
              component={ProductEditScreen}
            />

            <Route
              exact
              path={[
                "/search/:keyword",
                "/page/:pagenumber",
                "/search/:keyword/page/:pagenumber",
                "/",
              ]}
              component={HomeScreen}
            />
          </Switch>
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
