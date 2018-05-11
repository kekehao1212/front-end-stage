
import {browserHistory} from 'react-router';

export function locationHref(url, opt={}){
    if(url.indexOf('http://')===0||url.indexOf('https://')===0){
        location = url
    }else{
        browserHistory.push({
            pathname:url,
            query:opt
        })
    }
}
export function locationReplace(url, opt={}){
    if(url.indexOf('http://')===0||url.indexOf('https://')===0){
        location.replace(url)
    }else{
        browserHistory.replace({
            pathname:url,
            query:opt
        })
    }
}