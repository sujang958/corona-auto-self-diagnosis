module.exports = {
    sort: school => {
        if (school.includes('초등')) {
            return '2';
        } else if (school.includes('중')) {
            return '3';
        } else if (school.includes('고등')) {
            return '4';
        } else if (school.includes('특수')) {
            return '5';
        } else if (school.includes('유치')) {
            return '1';
        }
    },
    학교인덱스: {
        유치원: '1',
        초등학교: '2',
        중학교: '3',
        고등학교: '4',
        특수학교: '5'
    },
    도시인덱스: {
        서울: '01',
        부산: '02',
        대구: '03',
        인천: '04',
        광주: '05',
        대전: '06',
        울산: '07',
        세종: '08',
        경기도: '10',
        강원도: '11',
        충청북도: '12',
        충청남도: '13',
        전라북도: '14',
        전라남도: '15',
        경상북도: '16',
        경상남도: '17',
        제주: '18',
    }
}