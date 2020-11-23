import { getProjectById } from "./api";

import "./style.scss";

const root = document.getElementById("embedTable");

function renderWidget(root, template, fields) {
  const wrapper = document.createElement("div");
  wrapper.classList.add(template);

  fields.map((row) => {
    const rowDOM = document.createElement("div");
    rowDOM.classList.add("item");
    let buttonText = row.find((el) => el.name == "Button_text");
    let buttonUrl = row.find((el) => el.name == "Button_url");
    for (let i = 0; i < row.length; i++) {
      let itemDOM = null;
      itemDOM = document.createElement("div");
      itemDOM.classList.add(row[i].name.replace(" ", "-"));

      if (row[i].name == "Button_text" && row[i].value) {
        const link = row.find((el) => el.name == "Button_url");
        let linkValue = null;
        if (link) {
          linkValue = link.value || "/";
        }
        itemDOM.innerHTML = `<a href='${link}'>${row[i].value}</a>`;
      } else if (row[i].name == "Button_url") {
        continue;
      } else if (row[i].name == "Image_url") {
        itemDOM.innerHTML = `<img loading="lazy" src='${row[i].value ||
          "https://via.placeholder.com/150"}'/>`;
      } else {
        itemDOM.innerHTML = row[i].value;
      }
      rowDOM.append(itemDOM);
    }
    wrapper.append(rowDOM);
  });

  root.append(wrapper);
}

(async function() {
  if (process.env.NODE_ENV === "production") {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://zealous-colden-9ab4fd.netlify.app/style.css";
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  const data = await getProjectById(root.dataset["embedtableid"]);
  root.style.setProperty("--primary-color", data.primaryColor);
  root.style.setProperty("--secondary-color", data.secondaryColor);
  renderWidget(root, data.templateSlug, data.fields);
})();