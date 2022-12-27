import React, { useCallback, useState } from 'react'
import ME_ProgressCircle from './progress_circle';
import ME_ProgressCircle_Text from './progress_circle_text';

function ME_Progress({}) {
    const firstLine = 40
    return (
        <div className='ME-process-container-outer'>
            <div className='ME-process-container-inner'>
                <div className='ME-absoluteZone'>
                    <ME_ProgressCircle 
                        active={true}
                        parentData={[60, firstLine, 50]}
                        data={[
                            [45, 22, 60, 5]
                    ]}/>
                    
                    <ME_ProgressCircle_Text
                        text={'TG Engaged'}
                        parentData={[50, firstLine + 60, 100]}
                        data={[
                            [0, 0, 150]
                    ]}/>

                    <ME_ProgressCircle 
                        active={false}
                        parentData={[160, firstLine, 50]}
                        data={[
                            [45, 22, 60, 5]
                    ]}/>

                    <ME_ProgressCircle_Text
                        text={'Blocking Reset'}
                        parentData={[160, firstLine + 60, 80]}
                        data={[
                            [0, 0, 50]
                    ]}/>

                    <ME_ProgressCircle 
                        active={true}
                        parentData={[260, firstLine, 50]}
                        data={[
                            [45, 22, 150, 5]
                    ]}/>

                    <ME_ProgressCircle_Text
                        text={'Handle Neutral OR RG Neutral'}
                        parentData={[260, firstLine + 60, 100]}
                        data={[
                            [0, 0, 50]
                    ]}/>

                    <ME_ProgressCircle_Text
                        text={'Shutdown Active'}
                        parentData={[360, firstLine + 60]}
                        data={[
                            [0, 0, 50]
                    ]}/>

                    <ME_ProgressCircle 
                        active={false}
                        parentData={[450, firstLine, 50]}
                        data={[
                            [45, 22, 60, 5]
                    ]}/>

                    <ME_ProgressCircle_Text
                        text={'Engine Not Running'}
                        parentData={[450, firstLine + 60, 100]}
                        data={[
                            [0, 0, 50]
                    ]}/>

                    <ME_ProgressCircle 
                        active={true}
                        parentData={[550, firstLine, 50]}
                        data={[ 
                            [45, 22, 60, 5]
                    ]}/>

                    <ME_ProgressCircle_Text
                        text={'Governor Stop Not Pressed'}
                        parentData={[550, firstLine + 60, 120]}
                        data={[
                            [0, 0, 50]
                    ]}/>

                    <ME_ProgressCircle 
                        active={false}
                        parentData={[650, firstLine, 50]}
                        data={[
                            [45, 22, 60, 5],
                            [100, 22, 5, 135],
                            [-100, 152, 200, 5]
                    ]}/>
                    
                    <ME_ProgressCircle 
                        active={true}
                        parentData={[60, firstLine + 130, 50]}
                        data={[
                            [45, 22, 160, 5]
                    ]}/>
                    
                    <ME_ProgressCircle_Text
                        text={'Remote Ready Constant'}
                        parentData={[50, firstLine + 180, 120]}
                        data={[
                            [0, 0, 50]
                    ]}/>

                    <ME_ProgressCircle 
                        active={true}
                        parentData={[60, firstLine + 220, 50]}
                        data={[
                            [45, 22, 90, 5],
                            [135, -65, 5, 92]
                    ]}/>
                    
                    <ME_ProgressCircle_Text
                        text={'Local Ready to start'}
                        parentData={[50, firstLine + 270, 120]}
                        data={[
                            [0, 0, 50]
                    ]}/>

                    <ME_ProgressCircle 
                        active={true}
                        parentData={[260, firstLine + 130, 50]}
                        data={[
                            [45, 22, 100, 5]
                    ]}/>
                    
                    <ME_ProgressCircle_Text
                        text={'Emergency Stop Not Active'}
                        parentData={[270, firstLine + 185, 120]}
                        data={[
                            [0, 0, 50]
                    ]}/>

                    <ME_ProgressCircle 
                        active={true}
                        parentData={[390, firstLine + 130, 50]}
                        data={[
                            [45, 22, 80, 5]
                    ]}/>
                    
                    <ME_ProgressCircle_Text
                        text={'ME Lub Oil Pressure OK'}
                        parentData={[400, firstLine + 185, 120]}
                        data={[
                            [0, 0, 50]
                    ]}/>

                    <ME_ProgressCircle 
                        active={true}
                        parentData={[500, firstLine + 130, 50]}
                        data={[
                    ]}/>
                    
                    <ME_ProgressCircle_Text
                        text={'RG Lub Oil Low Pressure Shutdown'}
                        parentData={[510, firstLine + 185, 120]}
                        data={[
                            [0, 0, 50]
                    ]}/>

                    <div className='ME-dottedBorder' style={{width: 400, height: 130, top: firstLine  + 120, left: 240}} />

                    <ME_ProgressCircle_Text
                        text={'Start Interlock From Safety System'}
                        parentData={[320, firstLine + 260, 300]}
                        data={[
                            [0, 0, 50]
                    ]}/>
                </div>
            </div>
        </div>
    );
}

export default ME_Progress;