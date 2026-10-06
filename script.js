const $=id=>document.getElementById(id);
function money(id){return (Number($(id).value.replace(/,/g,''))||0)*10000}
function fmt(n){return Math.round(n/10000).toLocaleString('ko-KR')+'만원'}
function fmtInput(e){let v=e.value.replace(/[^0-9]/g,'');e.value=v?Number(v).toLocaleString('ko-KR'):''}
document.querySelectorAll('.money').forEach(e=>{e.addEventListener('input',()=>fmtInput(e));fmtInput(e)});
function calc(){
 const initial=money('initial'), monthly=money('monthly');
 const years=Math.max(1,Number($('years').value)||1);
 const r=Math.max(0,Number($('rate').value)||0)/100;
 const receive=Math.max(1,Number($('receiveYears').value)||1);
 const months=years*12, mr=Math.pow(1+r,1/12)-1;
 const fvInitial=initial*Math.pow(1+mr,months);
 const fvMonthly=mr===0?monthly*months:monthly*((Math.pow(1+mr,months)-1)/mr);
 const asset=fvInitial+fvMonthly, principal=initial+monthly*months;
 $('asset').textContent=fmt(asset);$('principal').textContent=fmt(principal);
 $('gain').textContent=fmt(Math.max(0,asset-principal));$('pension').textContent=fmt(asset/(receive*12));
}
$('calc').onclick=calc;calc();