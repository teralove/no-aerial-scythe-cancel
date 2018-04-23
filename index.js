const AERIAL_SCYTHE = 41;
const LOCK_TIME = 350; //may need to be adjusted for ping (and aspd?)

module.exports = function NoAerialScytheCancel(dispatch) {
    let job = -1,
    locked = false,
    
    dispatch.hook('S_LOGIN', 9, event => { job = event.templateId % 100 - 1; })
    
    dispatch.hook('C_START_SKILL', 5, event => {
        if (job === 0) {
            const skill = Math.floor((event.skill - 0x4000000) / 10000);
            if (skill === AERIAL_SCYTHE) {
                if (locked) return false;
                locked = true;
                setTimeout(() => {
                    locked = false;
                }, LOCK_TIME);
            }
        }
    })
    
}
