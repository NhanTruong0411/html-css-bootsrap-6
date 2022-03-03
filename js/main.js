

//=================================================Animate Effect Webpage========================================================
//Hàm scroll to top khi click vào button góc dưới phải, đồng thời cập nhập lại trạng thái của navbar.
var goToTop = function() {
  $('.js-gotop').on('click', function(){
    $('html, body').animate({
      scrollTop: $('html').offset().top
    }, 1500, 'easeInOutExpo');
  });

  $(window).scroll(function(){
    var $win = $(window);
    if ( $win.scrollTop() > 100 ) {
      $('.navbar').addClass('scrolled');
    } else {
      $('.navbar').removeClass('scrolled');
    }
  });
};

//Hàm contentWayPoint dùng để add animate mỗi khi scroll đúng vào 75% chiều cao của element
var contentWayPoint = function() {
  
  $('.animate-box').waypoint( function( direction ) {

    if( direction === 'down' ) {

      $(this.element).addClass('item-animate');
      setTimeout(function(){

        $('body .animate-box.item-animate').each(function(k){
          var el = $(this);
          
          setTimeout( function () {
            var effect = el.data('animate-effect');
            if ( effect === 'fadeIn') {
              el.addClass('fadeIn animated-fast');
            } else if ( effect === 'fadeInLeft') {
              el.addClass('fadeInLeft animated-fast');
            } else if ( effect === 'fadeInRight') {
              el.addClass('fadeInRight animated-fast');
            } else {
              el.addClass('fadeInUp animated-fast');
            }

            el.removeClass('item-animate');
          },  k * 200, 'easeInOutExpo' );
        });
        
      }, 100);
      
    }

  } , { offset: '75%' } );
};

//Hàm tạo đối tượng.
function createProduct(name, img, price, index) {
  return {
    name,
    img,
    price,
    index
  }
}



//========================================================Shopping Cart========================================================
let beef1 = createProduct('Beef 1', 'gallery_1.jpg', 120000, 0 );
let beef2 = createProduct('Beef 2', 'gallery_2.jpg', 100000, 0 );
let beef3 = createProduct('Beef 3', 'gallery_3.jpg', 90000, 0 );
let beef4 = createProduct('Beef 4', 'gallery_4.jpg', 220000, 0 );

let chicken1 = createProduct('Chicken 1', 'gallery_5.jpg', 120000, 0 );
let chicken2 = createProduct('Chicken 2', 'gallery_6.jpg', 100000, 0 );
let chicken3 = createProduct('Chicken 3', 'gallery_7.jpg', 90000, 0);
let chicken4 = createProduct('Chicken 4', 'gallery_8.jpg', 220000, 0 );

let pork1 = createProduct('Pork 1', 'gallery_9.jpg', 120000, 0 );
let pork2 = createProduct('Pork 2', 'gallery_10.jpg', 100000, 0 );
let pork3 = createProduct('Pork 3', 'gallery_11.jpg', 90000, 0 );
let pork4 = createProduct('Pork 4', 'gallery_12.jpg', 220000, 0 );

let fish1 = createProduct('Fish 1', 'gallery_13.jpg', 120000, 0 );
let fish2 = createProduct('Fish 2', 'gallery_14.jpg', 100000, 0 );
let fish3 = createProduct('Fish 3', 'gallery_15.jpg', 90000, 0 );
let fish4 = createProduct('Fish 4', 'gallery_16.jpg', 220000, 0 );

let allProducts = [beef1, beef2, beef3, beef4, chicken1, chicken2 ,chicken3 ,chicken4, pork1, pork2, pork3, pork4, fish1, fish2, fish3, fish4];



//Ham hien thi so san pham da them vao trong gio hang;
function countProductNumber(product) {
  let cartQuantity = document.querySelector('.badge.badge-danger');
  //LS chứa tổng số sản phẩm trong cart
  let productNumber = localStorage.getItem('totalCartNumber');
  productNumber = JSON.parse(productNumber);
  //LS chứa thông tin các sản phẩm
  let productsInCart = localStorage.getItem('productsInCart');
  productsInCart = JSON.parse(productsInCart);

  if(productNumber) {
    localStorage.setItem('totalCartNumber', productNumber + 1);
    cartQuantity.textContent = productNumber+1;
    cartQuantity.style.visibility = 'visible';
  } else if (!productNumber) {
    localStorage.setItem('totalCartNumber', 1)
    cartQuantity.textContent = 1;
    cartQuantity.style.visibility = 'visible'; }

  //Sau khi dem cac san pham da them vao gio hang, goi ham them cac san pham vao trong localStorage
  addProductToCart(product);
}



//Ham hien thi so luong san pham them vao gio hang sau khi reload page;
function onloadCartNumber() {
  let cartQuantity = document.querySelector('.badge.badge-danger');
  let productNumber = localStorage.getItem('totalCartNumber');
  productNumber = JSON.parse(productNumber);
  if(productNumber) {
    cartQuantity.textContent = productNumber;
    cartQuantity.style.visibility = 'visible';
  }
}



//Ham them cac san pham vao trong localStorage
function addProductToCart(product) {
  let cartItems = localStorage.getItem('productsInCart')
  cartItems = JSON.parse(cartItems);
  //Neu trong localStorage cartItems da co san pham thi them san pham tiep theo ben duoi;
  if(cartItems) {
    cartItems = {
      ...cartItems,
      [product.name] : product,
    }
    cartItems[product.name].index++;
  } else { //Neu chua co san pham thi tao 1 doi tuong roi them vao trong localStorage
    cartItems = {
      [product.name] : product,
    }
    cartItems[product.name].index = 1;
  }

  localStorage.setItem('productsInCart',JSON.stringify(cartItems));
  cartItems = localStorage.getItem('productsInCart');
}



//Ham chuyen doi tien te
function formatCash(str) {
  return str.split('').reverse().reduce((prev, next, index) => {
    return ((index % 3) ? next : (next + ',')) + prev
  })
}



//Ham tinh tong tien 
function totalCartCost(product) {
  let cartCost = localStorage.getItem('totalCost');
  cartCost = JSON.parse(cartCost);
  if(cartCost) {
    localStorage.setItem('totalCost', cartCost + product.price);
  } else {
    localStorage.setItem('totalCost', product.price);
  }
  cartCost = localStorage.getItem('totalCost');
  cartCost = JSON.parse(cartCost);
}


//Ham hien thi san pham vao ben trong shopping cart
function displayCart() {
  //localStorage chua tien cua cac san pham trong localStorage
  let cartCost = localStorage.getItem('totalCost');
  cartCost = JSON.parse(cartCost);
  //cartItems: localStorage chinh, chua thong tin cac san pham
  let cartItems = localStorage.getItem('productsInCart')
  cartItems = JSON.parse(cartItems);
  
  let cartProductsContainer = document.querySelector('#cartProductsContainer');
  let productsContainer_footer = document.querySelector('#productsContainer_footer')
  let cart_nothing = document.querySelector('#cart_nothing');
  let tableCart = document.querySelector('#tableCart');


  if(cartItems && cart_nothing) {
    // cart_nothing = '';
    cart_nothing.style.display = 'none';
    Object.values(cartItems).map(item => {
      cartProductsContainer.innerHTML += `<tr class="">
                                              <td>${item.name}</td>
                                              <td style="width:300px; height: auto"><img src="images/${item.img}" class="w-100 img-fuild"></td>
                                              <td>
                                                <span class="decreaseButton"><i class="fas fa-arrow-circle-left"></i></span>&nbsp;
                                                ${item.index}&nbsp;
                                                <span class="increaseButton" ><i class="fas fa-arrow-circle-right"></i></span></td>
                                              <td>${formatCash(item.price.toString())} vnđ</td>
                                              <td>${formatCash((item.price * item.index).toString())} vnđ</td>
                                              <td>
                                                <a type="button" class="btn btn-danger btn-remove">Delete</a>
                                              </td>
                                          </tr>`
    });
    productsContainer_footer.innerHTML += `<hr>
                                            <div class="totalContainer text-light">
                                              <div class = "row">
                                                <div class="col-6">
                                                  <a type="button" class="btn btn-lg btn-danger m-4" onclick="clearCart()">Delete All</a>
                                                  <a type="button" href="./contact.html" class="btn btn-lg btn-info m-4">Pay The Bill</a>
                                                </div>
                                                <div class="col-6">
                                                  <h4 class="text-right display-4">Total Pay : ${formatCash(cartCost.toString())} vnđ</h4>
                                                </div>
                                              </div>
                                            </div>`
  }
  //Goi ham xoa tung san pham trong cart moi khi co san pham trong cart
  deleteButton();
  //Goi tham thay doi so luong san pham trong cart
  changeProductsQuantity();
}


//Ham xoa tung san pham trong cart
function deleteButton() {
  let deleteButton = document.querySelectorAll('.btn.btn-danger.btn-remove');
  let producstInfo, productsChild, productsName;
  //Lay LS totalCartNumber de cap nhap lai so luong san pham sau khi click delete button;
  let totalCartNumber = localStorage.getItem('totalCartNumber')
  //Lay LS totalCost de cap nhap lai tong gia tien san pham sau khi click delete button;
  let totalCost = localStorage.getItem('totalCost')
  //Lay LS productsInCart de xac dinh san pham can xoa cu the;
  let productsInCart = localStorage.getItem('productsInCart');
  productsInCart = JSON.parse(productsInCart);

  for (let i=0; i<deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', () => {
      //Lay ten san pham sau khi click
      producstInfo = deleteButton[i].parentElement.parentElement;
      productsChild = producstInfo.getElementsByTagName('td')[0];
      productsName = productsChild.innerHTML;
      //Sau khi da co ten san pham tuong ung voi key object;
      //Cap nhap lai so luong san pham ben trong cart qua LS totalCartNumber;
      localStorage.setItem('totalCartNumber', totalCartNumber - productsInCart[productsName].index);
      //Cap nhap lai tong gia tien ben trong cart qua LS totalCost;
      localStorage.setItem('totalCost', totalCost - (productsInCart[productsName].price * productsInCart[productsName].index));
      //Xoa san pham ra khoi LS productsInCart;
      delete productsInCart[productsName];
      //Cap nhap lai LS productsInCart
      localStorage.setItem('productsInCart',JSON.stringify(productsInCart));
      //Goi lai ham hien thi san pham va hien thi so luong san pham
      displayCart();
      onloadCartNumber();
      location.reload();
    });
  }
}



//Ham thay doi so luong san phan
function changeProductsQuantity() {
  let productsInCart = localStorage.getItem('productsInCart')
  productsInCart = JSON.parse(productsInCart)
  let totalCartNumber = localStorage.getItem('totalCartNumber')
  totalCartNumber = JSON.parse(totalCartNumber);
  let totalCost = localStorage.getItem('totalCost');
  totalCost = JSON.parse(totalCost);
  
  let decreaseButton = document.querySelectorAll('.decreaseButton');
  let increaseButton = document.querySelectorAll('.increaseButton')
  let curQuantity = 0;
  let curProductName = '';

  //Xử lý giảm
  for(let i=0; i<decreaseButton.length; i++) {
    decreaseButton[i].addEventListener('click', () => {
      //Lay so luong cua san pham cu the ben trong cart;
      curQuantity = decreaseButton[i].parentElement.textContent.trim();
      //Lay ten cua san pham cu the ben trong cart;
      curProductName = decreaseButton[i].parentElement.previousElementSibling.previousElementSibling.textContent;
      //Giam xuong luong san pham moi lan click
      if(productsInCart[curProductName].index > 1) {
        productsInCart[curProductName].index -= 1;
        //Cap nhap lai LS productsInCart
        localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
        //Cap nhap lai LS totalCartNumber
        localStorage.setItem('totalCartNumber', JSON.stringify(totalCartNumber - 1))
        //Cap nhap lai LS totalCost
        localStorage.setItem('totalCost', JSON.stringify(totalCost - productsInCart[curProductName].price))
        displayCart();
        location.reload();
      }
    })
  }

  //Xử lý tăng
  for(let i=0; i<increaseButton.length; i++) {
    increaseButton[i].addEventListener('click', () => {
      curQuantity = increaseButton[i].parentElement.textContent.trim();
      curProductName = increaseButton[i].parentElement.previousElementSibling.previousElementSibling.textContent; 
      console.log(curProductName);
      if(productsInCart[curProductName].index >= 1) {
        productsInCart[curProductName].index += 1;
        //Cap nhap lai LS productsInCart
        localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
        //Cap nhap lai LS totalCartNumber
        localStorage.setItem('totalCartNumber', JSON.stringify(totalCartNumber + 1))
        //Cap nhap lai LS totalCost
        localStorage.setItem('totalCost', JSON.stringify(totalCost + productsInCart[curProductName].price))
        displayCart();
        location.reload();
      }
    })
  }
}



//Ham clear local Storage
clearCart = () => {
  localStorage.clear();
  window.location.reload();
}



//========================================================Filter Products========================================================
//function Show product
function showFilterProduct(allProducts) {
  var filterProductContainer = document.querySelector('#showFilterProduct');
  filterProductContainer.textContent = '';
  for(let i=0; i<allProducts.length; i++) {
    filterProductContainer.innerHTML += `<div class=" col-xl-3 col-lg-6 col-sm-6 padding-item my-5">
                                          <div class="overlay">
                                            <div class="item">
                                              <img src="images/${allProducts[i].img}" class="img-fluid">
                                              <h3>${allProducts[i].name}</h3>
                                              <span>${formatCash(allProducts[i].price.toString())}<sup>vnđ</sup></span>
                                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos nihil cupiditate ut vero alias quaerat inventore molestias vel suscipit explicabo.</p>
                                            </div>
                                            <div class="overlay-content">
                                              <div class="container">
                                                <div class="row">
                                                  <div class="col-4"><span href="#"><i class="fas fa-search"></i></span></div>
                                                  <div class="col-4"><span href="#"><i class="fas fa-heart"></i></span></div>
                                                  <div class="col-4"><span class="addToCartButton"><i class="fas fa-shopping-cart"></i></span></div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>`
  }
  //Vong lap qua cac button ben trong cac san pham cua trang menu;
  let addToCartButton = document.getElementsByClassName('addToCartButton');
  for(let i=0; i<addToCartButton.length; i++) {
    addToCartButton[i].addEventListener('click', () => {
      //Ham tinh hien thi so san pham da them vao gio hang;
      countProductNumber(allProducts[i]);
      //Ham tinh tong gia tien cua cac san pham;
      totalCartCost(allProducts[i]);

    });
  }
}
//Sử dụng Jquery cho sự kiện on key up mỗi khi user nhập vào searchInput;
$('#searchInput').on('keyup', function() {
  var userSearchValue = $(this).val();
  var allData = searchProduct(userSearchValue, allProducts);
  //Truyền dữ liệu mảng mới filterProducts vào hàm showFilterProduct để in ra màn hình;
  showFilterProduct(allData);
});
//Hàm lọc giá trị user nhập vào và giá trị tương ứng bên trong mảng allProducts (nhập tên trong trường hợp này);
function searchProduct(userSearchValue, allData) {
  var filterProducts = [];
  for(let i=0; i<allData.length; i++) {
    userSearchValue = userSearchValue.toLowerCase();
    var productName = allData[i].name.toLowerCase();
    //So sánh giá trị nhập vào của user và giá trị name trong allProducts, nếu hợp lệ, add vào mảng filterProducts;
    if(productName.includes(userSearchValue)) {
      filterProducts.push(allData[i]);
    }
  }
  return filterProducts;
}



//========================================================Validate Form========================================================
//ràng buộc Email
validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
//ràng buộc phoneNumber 
validatePhone = (phone) => {
  const regexPhone = /(01|09|07)+([0-9]{8}|[0-9]{9})\b/ig;
  return regexPhone.test(phone);
}


onFormSubmit = () => {
  let fullName = document.getElementById('fullName').value;
  let email = document.getElementById('email').value;
  let phoneNumber = document.getElementById('phoneNumber').value;
  let address = document.getElementById('address').value;

  //ràng buộc cho fullName
  if(fullName == '') {
    fullName = '';
    document.getElementById('fullName-error').innerHTML = "* Vui lòng nhập vào họ tên !";
  } else if (fullName.trim().length < 5) {
    fullName = '';
    document.getElementById('fullName-error').innerHTML = "Họ tên không được nhỏ hơn 4 ký tự !";
  } else if (fullName.trim().length > 40) {
    fullName = '';
    document.getElementById('fullName-error').innerHTML = "Họ tên không được lớn hơn 40 ký tự !";
  } else {
    document.getElementById('fullName-error').innerHTML = "";
  }
  //ràng buộc cho Email
  if (email == '') {
    email = '';
    document.getElementById('email-error').innerHTML = "* Vui lòng nhập vào email !";
  } else if (!validateEmail(email)) {
    email = '';
    document.getElementById('email-error').innerHTML = "* Email không hợp lệ, vui lòng nhập lại !";
  } else {
    document.getElementById('email-error').innerHTML = ""; 
  }

  //ràng buộc cho phoneNumber
  if (phoneNumber == '') {
    phoneNumber = '';
    document.getElementById('phoneNumber-error').innerHTML = "* Vui lòng nhập vào số điện thoại !";
  } else if (phoneNumber.trim().length < 10 && phoneNumber.trim().length > 11) {
    phoneNumber = '';
    document.getElementById('phoneNumber-error').innerHTML = "* Số điện thoại gồm 10 hoặc 11 chữ số";
  } else if (!validatePhone(phoneNumber)) {
    phoneNumber = '';
    document.getElementById('phoneNumber-error').innerHTML = "* Số điện thoại không hợp lệ, vui lòng nhập lại !";
  } else {
    document.getElementById('phoneNumber-error').innerHTML = ""; 
  }
  
  //ràng buộc cho address
  if (address == '') {
    address = '';
    document.getElementById('address-error').innerHTML = "* Vui lòng nhập vào địa chỉ !";
  } else if (address.trim().length < 15) {
    address = '';
    document.getElementById('address-error').innerHTML = "* Vui lòng nhập đầy đủ địa chỉ !";
  } else {
    document.getElementById('address-error').innerHTML = ""; 
  }
}


onloadCartNumber();
displayCart();
goToTop();
contentWayPoint();
showFilterProduct(allProducts);