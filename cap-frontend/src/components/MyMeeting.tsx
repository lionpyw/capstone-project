import { DyteMeeting } from "@dytesdk/react-ui-kit"
import { useDyteMeeting } from "@dytesdk/react-web-core"


const MyMeeting = () => {
  const { meeting } = useDyteMeeting()

  return (
    <div style={{ height: '480px' }}>
      <DyteMeeting mode="fill" meeting={meeting} showSetupScreen={false} />
    </div>
  )
}

export default MyMeeting