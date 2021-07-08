import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Model/user';
import { Login } from "../Model/login";
import { Product } from "../Model/product";
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  commonHeaders = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': environment.baseUrl, 'Access-Control-Allow-Methods': ['POST', 'GET', 'PUT'] }
  
  constructor(@Inject(SESSION_STORAGE) private storage: StorageService, private http: HttpClient) {

  }
  
  register(user: User): Observable<any> {
    return this.http.post(environment.baseUrl+environment.signupUrl,
      JSON.stringify(user), { headers: this.commonHeaders }
    );
  }

  login(login: Login): Observable<any> {
    return this.http.post(environment.baseUrl+environment.loginUrl,
      JSON.stringify(login), { headers: this.commonHeaders }
    );
  }

  logout(){
    this.http.get<any>(environment.baseUrl+environment.logoutUrl);
  }

  addToCart(product: Product, selectedQuantity: number): Observable<any> {
    console.log(product)
    const data = { product ,
    selectedQuantity}
    console.log(data)
    return this.http.post<any>(environment.baseUrl+environment.addToCartUrl +"/"+this.getUserId()+"/"+selectedQuantity,
      JSON.stringify(product),
      { headers: this.commonHeaders }
    );
  }

  getCartItems(): Observable<any> {
    return this.http.get<any>(environment.baseUrl+environment.viewCartUrl+"/"+this.getUserId());
  }

  updateCartItem(prodid: number, quant: number): Observable<any> {
    var map = {
      "id":prodid,
      "quantity":quant
    }
    return this.http.put<any>(environment.baseUrl+environment.updateCartUrl, map);
  }

  deleteCartItem(bufdid: number, productName: string): Observable<any> {
    return this.http.post<any>(environment.baseUrl + environment.deleteCartUrl + "/" + bufdid + "/" + productName,
      { headers: this.commonHeaders }
    );
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(environment.baseUrl+environment.productsUrl, 
      { headers: this.commonHeaders }
    );
  }

  addProduct(productName: string, description: string, quantity: string, price: string, imageUrl: string): Observable<any> {
    let productDetails = {
      'productName': productName,
      'description': description,
      'quantity': quantity,
      'price': price,
      'imageUrl': imageUrl
    }
    return this.http.post<any>(environment.baseUrl+environment.addProductUrl, JSON.stringify(productDetails), 
      { headers: this.commonHeaders }
    );
  }
  
  updateProduct( prodname: string, desc: string, quan: string, price: string,  imageUrl: string, productId: string): Observable<any> {
    let updateProductDetails = {
      'productName': prodname,
      'description': desc,
      'quantity': quan,
      'price': price,
      'imageUrl': imageUrl,
      'productId': productId
    }
    console.log(updateProductDetails)
    return this.http.post<any>(environment.baseUrl+environment.updateProductUrl, JSON.stringify(updateProductDetails),
      { headers: this.commonHeaders }
    );
  }

  deleteProduct( productId: number) {
    return this.http.post<any>(environment.baseUrl+environment.deleteProductUrl + "/" + productId,
     { headers: this.commonHeaders }
    );
  }

  getOrders() {
    return this.http.get<any>(environment.baseUrl+environment.viewOrderUrl)
  }

  placeOrder(): Observable<any> {
    return this.http.post<any>(environment.baseUrl+environment.placeOrderUrl + "/" + this.getUserId(),
      { headers: this.commonHeaders }
    );
  }

  viewMyOrders(): Observable<any> {
    return this.http.get<any>(environment.baseUrl+environment.viewMyOrdersUrl + "/" + this.getUserId(),
    { headers: this.commonHeaders }
  );
  }

  updateStatusForOrder( order: any) {
    const formData: FormData = new FormData();
    formData.append("orderId", order.orderId);
    formData.append("Status", order.orderStatus);
    return this.http.post<any>(environment.baseUrl+environment.updateOrderUrl, formData)
  }

  userProfile(){
    return this.http.get<any>(environment.baseUrl+environment.profileUrl + "/" + this.getUserId(),
     { headers: this.commonHeaders }
    );
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  storeUserId(userId: string) {
    console.log(userId)
    this.storage.set("userId", userId)
  }

  getUserId() {
    return this.storage.get("userId")
  }

  setUserId(email: string) {
    return this.http.get<any>(environment.baseUrl+environment.setUserIdUrl + "/" + email,
    { headers: this.commonHeaders }
    );
  }

  storeToken(token: string, auth_type: string) {
    this.storage.set("auth_token", token);
    this.storage.set("auth_type", auth_type);
  }

  getAuthType(): string {
    return this.storage.get("auth_type")
  }

  getToken() {
    return this.storage.get("auth_token");
  }

  removeToken() {
    this.storage.remove("auth_type");
    return this.storage.remove("auth_token");
  }

}
