const check = async (criteria,drives)=>
{
    const academic = criteria.academic_info;
    const offers= criteria.offers;
    var fields=["cgpa","be_percent","tenth_percent","twelveth_percent","gap","livekt","deadkt","gender","company_name","package"];
    var final_drive=[];
    for(var i=0;i<drives.length;i++)
    {
        var flag=true;
        console.log(i)
        for(var j=0;j<4;j++)
        {
            if(academic[fields[j]]<drives[i][fields[j]])
            {
                flag=false;
                break;
            }
        }
        for (var k=4;k<7;k++)
        {
            if(academic[fields[k]]>drives[i][fields[k]])
            {
                flag=false;
                break;
            }
        }
        for(var l=0;l<offers.length;l++)
        {
            if((offers[l]["package"]*1.5)>=drives[i]["package"])
            {
                console.log("offer letter")
                flag=false;
            }
        }
        if(flag)
        {
            final_drive.push(drives[i])
        }
       
    }
    return final_drive;
}

export default {check};