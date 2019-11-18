import $ from "jquery";
import getQueryResults from "./js/lib/api";

const searchButton = $("#search-button");
const resultText = $("#result-text");
const table = $("#table-body");
const progressBar = $("#progress-bar");
const searchBox = $("#search-query");

// setup
progressBar.hide();
searchButton.attr("disabled", true);

const clearTable = () => {
  table.empty();
};

/**
 * @param {{ name: string, score: number, content: number, location: number, pagerank: number, url: string }} rowData
 */
const addTableRow = rowData => {
  table.append(`
  <tr>
    <th scope="row"><a href="https://wikipedia.com${rowData.url}">${decodeURIComponent(rowData.name)}</a></th>
    <td>${rowData.score}</td>
    <td>${rowData.content}</td>
    <td>${rowData.location}</td>
    <td>${rowData.pagerank}</td>
  </tr>`);
};

const setResultText = (total, time) => {
  resultText.text(`Found ${total} results in ${time} sec`);
};

const doSearch = async () => {
  clearTable();
  progressBar.show();

  const results = await getQueryResults(searchBox.val());
  results.pages.forEach(res => {
    addTableRow(res);
  });

  progressBar.hide();
  setResultText(results.total, results.time);
};

const checkInput = () => {
  const val = searchBox.val();
  if (val.length > 0) searchButton.attr("disabled", false);
  else searchButton.attr("disabled", true);
};

searchButton.click(doSearch);
searchBox.on("input", checkInput);
