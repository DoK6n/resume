import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export async function pdfPrint() {
  const hiddenElements = document.querySelectorAll('[data-pdf="hidden"]')
  hiddenElements.forEach(el => (el.style.display = 'none'))

  // 전체 문서의 높이를 얻기 위해 body의 scrollHeight 사용
  const fullHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  )

  const canvas = await html2canvas(document.body, {
    height: fullHeight,
    windowHeight: fullHeight,
    scale: 2,
  })

  hiddenElements.forEach(el => (el.style.display = ''))

  // 캔버스를 이미지로 변환
  const imgData = canvas.toDataURL('image/png')
  const imgWidth = 210 // A4 가로 길이(mm)
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  const doc = new jsPDF('p', 'mm', [imgWidth, imgHeight])

  // 이미지를 PDF에 추가
  doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

  // Contact 섹션의 링크 정보 추가
  // const contactSection = document.querySelector('[data-section="contact"]')
  // if (contactSection) {
  //   const links = contactSection.getElementsByTagName('a')
  //   const sectionRect = contactSection.getBoundingClientRect()
  //   const scale = canvas.width / window.innerWidth

  //   for (let i = 0; i < links.length; i++) {
  //     const link = links[i]
  //     const rect = link.getBoundingClientRect()
  //     const relativeTop = rect.top - sectionRect.top

  //     doc.link(
  //       (rect.left * imgWidth) / canvas.width,
  //       ((sectionRect.top + relativeTop) * imgHeight) / canvas.height,
  //       (rect.width * imgWidth) / canvas.width,
  //       (rect.height * imgHeight) / canvas.height,
  //       { url: link.href },
  //     )
  //   }
  // }

  // PDF를 새탭으로 열기
  window.open(doc.output('bloburl'))

  // PDF를 바로 다운로드
  doc.save('kimdokyun-resume.pdf')
}
