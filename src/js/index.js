let url = "http://localhost:3000/transactions";

const uploadBtn = document.querySelector(".upload");
const payItems = document.querySelector(".pay__items");
const filterBar = document.querySelector(".container");
const payLists = document.querySelector(".pay-lists");
const dateSort = document.querySelector(".date-sort");
const priceSort = document.querySelector(".price-sort");
const searchInput = document.querySelector('.search-input')
document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  uploadBtn.addEventListener("click", () => {
    uploadBtn.style.display = "none";
    filterBar.style.display = "flex";
    ui.getPayments(url);
  });
  priceSort.addEventListener("click", () => ui.checkPriceSortIcon());
  dateSort.addEventListener("click", () => ui.checkDateSortIcon());
  searchInput.addEventListener("input" ,(text) => {

    console.log(text.target.value);
    let input = text.target.value
    ui.sortSearchInput(input)
  } )
});

class UI {
  async getPayments(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        this.ShowPayments(data);
      } else new Error(data.err);
    } catch (err) {
      console.log(err.message);
    }
  }

  ShowPayments(data) {
    let result = ``;
    data.forEach((payment) => {
      result += ` <div class="pay__items">
        <div class="pay__item">${payment.id}</div>
        ${this.paymentType(payment.type)}
        <div class="pay__item">${this.formatPaymentPrice(payment.price)}</div>
        <div class="pay__item">${payment.refId}</div>
        <div class="pay__item">
          <div class="items__time">
            <span>${this.datePayment(payment.date)}</span>
            <span>ساعت</span>
            <span>${this.timePayment(payment.date)}</span>
          </div>
        </div>
        </div>`;
    });

    payLists.innerHTML = result;
  }

  paymentType(type) {
    if (type === "افزایش اعتبار") {
      return `<div class="pay__item pay__type success">${type}</div>`;
    } else {
      return `<div class="pay__item pay__type harvest">${type}</div>`;
    }
  }

  datePayment(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleDateString("fa");
  }

  timePayment(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    return formattedTime;
  }

  formatPaymentPrice(price) {
    let formattedPrice = price.toString();
    let result = "";
    let rond = 0;
    for (let i = formattedPrice.length - 1; i >= 0; i--) {
      if (rond === 3) {
        result = "," + result;
        rond = 0;
      }
      result = formattedPrice[i] + result;
      rond++;
      if (i === 0) rond = 0;
    }
    return result;
  }

  checkPriceSortIcon() {
    const iconType = document.querySelector(".price-icon");
    const dateIconType = document.querySelector(".date-icon");
    let sortType = iconType.classList[1];
    const sortIcon = priceSort.querySelector("svg");

    dateIconType.classList.remove("descending", "ascending");
    dateIconType.classList.add("no-filter");
    const dateSortIcon = dateSort.querySelector("svg");
    dateSortIcon.setAttribute("viewBox", "0 0 24 24");
    dateSortIcon.innerHTML = `
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m8 15 4 4 4-4m0-6-4-4-4 4"
      />
    `;
  
    switch (sortType) {
      case "no-filter":
        iconType.classList.remove("no-filter");
        iconType.classList.add("descending");
        sortIcon.setAttribute("viewBox", "0 0 12 6");
        sortIcon.innerHTML = `
          <path
            d="M1 1L6 5L11 1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        `;
        url = "http://localhost:3000/transactions?_sort=price&_order=desc";
        this.getPayments(url);
        break;
  
      case "descending":
        iconType.classList.remove("descending");
        iconType.classList.add("ascending");
        url = "http://localhost:3000/transactions?_sort=price&_order=asc";
        this.getPayments(url);
        break;
  
      case "ascending":
        iconType.classList.remove("ascending");
        iconType.classList.add("no-filter");
        sortIcon.setAttribute("viewBox", "0 0 24 24");
        sortIcon.innerHTML = `
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m8 15 4 4 4-4m0-6-4-4-4 4"
          />
        `;
        url = "http://localhost:3000/transactions";
        this.getPayments(url);
        break;
    }
  }
  
  checkDateSortIcon() {
    const iconType = document.querySelector(".date-icon");
    const priceIconType = document.querySelector(".price-icon");
    let sortType = iconType.classList[1];
    const sortIcon = dateSort.querySelector("svg");
  
    priceIconType.classList.remove("descending", "ascending");
    priceIconType.classList.add("no-filter");
    const priceSortIcon = priceSort.querySelector("svg");
    priceSortIcon.setAttribute("viewBox", "0 0 24 24");
    priceSortIcon.innerHTML = `
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="m8 15 4 4 4-4m0-6-4-4-4 4"
      />
    `;
  
    switch (sortType) {
      case "no-filter":
        iconType.classList.remove("no-filter");
        iconType.classList.add("descending");
        sortIcon.setAttribute("viewBox", "0 0 12 6");
        sortIcon.innerHTML = `
          <path
            d="M1 1L6 5L11 1"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        `;
        url = "http://localhost:3000/transactions?_sort=date&_order=desc";
        this.getPayments(url);
        break;
      case "descending":
        iconType.classList.remove("descending");
        iconType.classList.add("ascending");
        url = "http://localhost:3000/transactions?_sort=date&_order=asc";
        this.getPayments(url);
        break;
      case "ascending":
        iconType.classList.remove("ascending");
        iconType.classList.add("no-filter");
        sortIcon.setAttribute("viewBox", "0 0 24 24");
        sortIcon.innerHTML = `
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m8 15 4 4 4-4m0-6-4-4-4 4"
          />
        `;
        url = "http://localhost:3000/transactions";
        this.getPayments(url);
        break;
    }
  }

  sortSearchInput(input) {
    if(searchInput.value !== '') {
        url = `http://localhost:3000/transactions?refId_like=${Number(input)}`
        this.getPayments(url)
    }else {
        url = "http://localhost:3000/transactions";
        this.getPayments(url);
    }
  }


}
