export default function Practice(){
  const webdev = ["JS", "Python", "React"]
  return(
    <div className="h-screen flex items-center justify-center">
      <ul className="text-2xl font-bold" >
        {webdev.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  )
}