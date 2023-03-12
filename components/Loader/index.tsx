export default function Loader () {
  return (
    <>
      <span className="loader"></span>
      <p className="text-center mt-4 text-textBlack">Loading...</p>
      <style jsx>{`
        .loader {
          width: 48px;
          height: 48px;
          border: 5px solid #FFF;
          border-radius: 50%;
          display: block;
          margin: auto;
          margin-top: 10rem;
          box-sizing: border-box;
          position: relative;
          animation: pulse 1s linear infinite;
        }
        .loader:after {
          content: '';
          position: absolute;
          width: 48px;
          height: 48px;
          border: 5px solid #FFF;
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          animation: scaleUp 1s linear infinite;
        }

        @keyframes scaleUp {
          0% { transform: translate(-50%, -50%) scale(0) }
          60% , 100% { transform: translate(-50%, -50%)  scale(1)}
        }
        @keyframes pulse {
          0% , 60% , 100%{ transform:  scale(1) }
          80% { transform:  scale(1.2)}
        }
      `}</style>
    </>
  )
}