import { pdfPrint } from './htmlToPDF'

window.onload = () => {
  document.getElementById('pdf-button').addEventListener('click', pdfPrint)
}
