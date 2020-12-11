import { getProjectById } from "./api";

const root = document.getElementById("embedTable");

function renderWidget(root, template, integrationName, showBranding, fields) {
  const wrapper = document.createElement("div");
  wrapper.classList.add(template);

  fields.map((row) => {
    if (integrationName === "airtable") {
      row.map((r) => {
        if (r.name.indexOf("*") > -1) {
          r["order"] = Number(r.name.split("*")[0]) || 99;
          r["name"] = r.name.substring(2);
        }
      });
      row = row.sort((el, el2) => el.order - el2.order);
      console.log(row);
    }

    const rowDOM = document.createElement("div");
    const rowImageWrapper = document.createElement("div");
    const rowContentWrapper = document.createElement("div");
    rowDOM.classList.add("item");
    rowImageWrapper.classList.add("item__image");
    rowContentWrapper.classList.add("item__content");
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
        itemDOM.innerHTML = `<a href='${linkValue}'>${row[i].value}</a>`;
        rowContentWrapper.append(itemDOM);
      } else if (row[i].name == "Button_url") {
        continue;
      } else if (row[i].name == "Image_url") {
        itemDOM.innerHTML = `<img loading="lazy" src='${row[i].value ||
          "https://picsum.photos/300"}'/>`;
        rowImageWrapper.append(itemDOM);
      } else {
        itemDOM.innerHTML = `<span>${row[i].value}</span>`;
        rowContentWrapper.append(itemDOM);
      }
      rowDOM.append(rowImageWrapper);
      rowDOM.append(rowContentWrapper);
    }
    wrapper.append(rowDOM);
    if (showBranding) {
      brandingDOM = document.createElement("div");
      brandingDOM.innerHTML = `<span>Made with embedtables.com</span>`;
      wrapper.append(brandingDOM);
    }
  });

  root.append(wrapper);
}
import styles from "./et-templates-style.css";

(async function() {
  root.innerHTML += `
    <style>${styles}</style> 
    `;
  const data = await getProjectById(root.dataset["embedtableid"]);
  root.style.setProperty("--primary-color", data.primaryColor);
  root.style.setProperty("--secondary-color", data.secondaryColor);
  renderWidget(
    root,
    data.templateSlug,
    data.integrationName,
    data.showBranding,
    data.fields
  );
})();
