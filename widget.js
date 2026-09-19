(function(){

const SUPABASE_URL = "__SUPABASE_URL__";
const SUPABASE_KEY = "__SUPABASE_ANON_KEY__";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const WIDGET_CSS = `

:root{
  --primary-colour:#132869;
  
  --secondary-colour:#facf39;
}
 
html, body {
  margin: 0;
  padding: 0;
}
 
*{font-family:'Sora',Arial;box-sizing:border-box;}
 
.wrapper{
  max-width:950px;
  margin:auto;
  padding:0 20px 20px;  /* ✅ no space above progress bar */
}
 
.card{
border:1px solid #ddd;
padding:20px;
border-radius:12px;
margin-bottom:20px;
background:#fff;
}
 
h5{
background:#f9f9f9;
color:var(--primary-colour);
padding:12px;
border-radius:10px;
margin-top:18px;
cursor: default;
display:flex;
justify-content:space-between;
border:2px solid var(--primary-colour)
}
 
label{display:block;margin-top:14px;}
 
input{
width:100%;
padding:10px;
margin-top:6px;
border-radius:6px;
border:1px solid #ccc;
}
 
 
.input-wrap{
  position:relative;
}
 
.input-wrap span{
  position:absolute;
  left:10px;
  top:50%;
  transform:translateY(-50%);
  font-weight:600;
  color:var(--primary-colour);
}
 
.input-wrap input{
  padding-left:25px !important;
}
 

select{
  width:100%;
  padding:10px;
  margin-top:6px;
  border-radius:6px;
  border:1px solid #ccc;
  font-family:'Sora',Arial;
  font-size:14px;
  background:#fff;

  appearance:none;
  -webkit-appearance:none;
  -moz-appearance:none;

  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%23132869' stroke-width='2'><polyline points='5,7 10,12 15,7'/></svg>");
  background-repeat:no-repeat;
  background-position:right 10px center;
  background-size:16px;
}
 
input{
  height:40px;
}

select{
  height:auto;
  min-height:40px;
}
 
.exp{
margin-top:12px;
padding:12px;
background:#fafafa;
border-radius:8px;
scroll-margin-top:80px;
}
 
.cta-question {
  margin-top:16px;
  margin-bottom:10px;
  font-size:18px;
  font-weight:600;
  color:var(--primary-colour);
}

.planned-spending-title{
  text-align:left;
  font-weight:700;
  margin-top:20px;
  margin-bottom:10px;
}

@media (max-width:600px){

  .planned-spending-title{
    text-align:center;
  }

}
 
.text-block {
  margin: 0;
  line-height: 1.4;
}
 
.text-block + .text-block {
  margin-top: 8px;
}
 
.text-block:first-child {
  margin-top: 0;
}

/* Marks the start of each bullet section (• Income Protection, • Life
   Cover, • Critical Illness Cover, • Emergency Fund) within the Summary
   box - previously these ran straight into each other with no visual
   separation, reading as one continuous block despite covering distinct
   topics. A thin divider plus extra spacing breaks that up. Skipped on
   whichever section happens to be first in a given box, since there's
   nothing above it to separate from. */
.sectionDivider {
  margin-top: 20px !important;
  padding-top: 20px;
  border-top: 1px solid #eee;
}
.sectionDivider:first-child {
  margin-top: 0 !important;
  padding-top: 0;
  border-top: none;
}
  
.fade-in{
  opacity: 1;
  transform: none;
}
 
.toggle{
  display:flex;
  gap:8px;
  margin-top:6px;
  flex-wrap:wrap;
}
 
 
#scoreBox {
  margin-bottom: 20px;
}
 
.toggle span{
  padding:6px 12px;
  border:1px solid #ccc;
  border-radius:20px;
  cursor:pointer;
  flex:1;
  text-align:center;
  /* .toggle's parent is already display:flex, which stretches every
     button to match the height of the tallest one automatically (e.g.
     when "Non-essential" wraps to two lines while its siblings stay on
     one). Without these three lines, that extra height went entirely to
     the bottom of the shorter buttons' text rather than centring it -
     making the row look uneven even though every button was already the
     same height. This centres each button's own text within whatever
     height the row ends up needing, on both axes, without needing to
     shrink the font to force a single-line fit. */
  display:flex;
  align-items:center;
  justify-content:center;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  transition: background 0.2s ease, color 0.2s ease, transform 0.1s ease;
}
 
 
.toggle .on{background:var(--primary-colour);color:#fff;}
 
.flex-slider{
display:none;
margin-top:10px;
background:#eef3ff;
padding:10px;
border-radius:8px;
}
 
.small{font-size:12px;margin-top:5px;}
 
.btn{
margin-top:14px;
padding:14px;
background:var(--primary-colour);
color:#fff;
width:100%;
border:none;
border-radius:8px;
font-size:18px;
cursor:pointer;
}
 
.btn, .btn-secondary {
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}
 
.btn {
  background:var(--primary-colour);
  color:#fff;
  font-weight:600;
}
 
.btn:hover {
  transform: translateY(-2px);
  box-shadow:0 6px 14px rgba(0,0,0,0.15);
}
 
.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow:0 6px 14px rgba(0,0,0,0.15);
}
 
#resultActions button {
  height:52px;
  font-size:16px;
}
 
 
.toggle span:active{
  transform: scale(0.97);
}
 
.btn-secondary{
margin-top:15px;
padding:14px;
background:var(--primary-colour);
color:#fff;
width:100%;
border:none;
border-radius:8px;
font-size:18px;
cursor:pointer;
}
 

#calcBtn,
#pdfBtn {
  margin-top:15px;
}

 
#calcBtn {
  margin-top:20px;
}
 
 
.box{
  border:1px solid #ddd;
  padding:15px;
  border-radius:10px;
  margin-top:20px;
  background:#ffffff;
  color:#222;
}
 
.box .btn {
  margin-top:10px;
}
 
.box + .box {
  margin-top: 15px;
}
 
.risk{
  color:#fff;
  text-align:center;
  padding:16px;
  border-radius:10px;
  margin-bottom:0px;
  display:block;
  width:100%;
}
 
 
.service-field {
  margin-top:10px;
}
 
 
#out{
  background:#ffffff;
  padding:15px;
  border-radius:12px;
}
 
#scoreBox{
  margin-top:25px;
  margin-bottom:0px;
}
 
#out{
  margin-top:0;
}
 
#out > *:first-child {
  margin-top: 0;
}
 
.section { display: block; }

.step{
  opacity:0;
  transform: translateY(10px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.step.active{
  opacity:1;
  transform: translateY(0);
}

#progressBar,
#resultActions {
  scroll-margin-top: 140px;
}
 
 
.result{
border:1px solid #ddd;
padding:20px;
border-radius:12px;
margin-bottom:20px;
}
 
 
.highlight{

  margin-top:10px;
  background:#eef3ff;
  color:var(--primary-colour);
  text-align:center;
  padding:16px;
  border-radius:10px;
}
 
 
.big{font-size:28px;font-weight:700}
 
.ind{
width:10px;height:10px;border-radius:50%;
display:inline-block;margin-right:6px;
}
 
.green{background:#1e8449;}
.orange{background:#e67e22;}
.red{background:#b00020;}
  
 
#e1 {
  background:#f5f5f5;
  color:#666;
  cursor:not-allowed;
}
 
#resultActions {
  display:flex;
  gap:10px;
  margin-bottom:25px;
}
 
#resultActions {
  align-items: stretch;
}
 
#resultActions button{
  flex:1;
}
@media (max-width: 600px){
 
  #resultActions {
    flex-direction: column;
    gap:8px;
  }
 
  #resultActions button{
    width:100%;
    font-size:16px;
    height:auto;
    padding:14px;
    margin-top:0;
  }
 
}
  
.section-title {
  font-size:22px;
  font-weight:700;
  color:var(--primary-colour);
  margin-bottom:10px;
  border-bottom:2px solid #eef3ff;
  padding-bottom:5px;
}
 

.progress-wrap{
  text-align:center;
  margin-bottom:8px;
}

.progress-text{
  font-size:15px;
  font-weight:700;
  color:var(--primary-colour);
  margin-bottom:10px;
}

.progress-dots{
  display:flex;
  justify-content:center;
  gap:14px;
}

.dot{
  width:12px;
  height:12px;
  border-radius:50%;
  background:#e8ecf8;
}

.dot.active{
  background:var(--primary-colour);
  transform:scale(1.2);
  box-shadow:0 0 0 4px rgba(19,40,105,.12);
}

@keyframes spin{
  0%{ transform:rotate(0deg); }
  100%{ transform:rotate(360deg); }
}

 
#pdfBtn, #emailBtn {
  display: none;
}
 
@media print {

  /* @page margin needs a real value, not 0. body padding only ever applies
     once - to the very top of page 1 and the very bottom of the final page
     - it does NOT repeat at every page boundary in between. @page margin
     is what repeats consistently on every single page. Trade-off: this
     likely brings back the browser's own default print header/footer
     (URL/date/page number), same known limitation as before - the fix for
     boxes sitting flush against the top of every page 2+ takes priority. */
  @page {
    margin: 15mm 12mm;
  }

  body {
    background:#fff;
    font-size:13px;
    line-height:1.5;
  }
 
button{
  display:none !important;
}
 
  .wrapper{
    max-width:100%;
    padding:0;
  }
 
  #progressBar,
  #resultActions,
  .btn,
  .btn-secondary,
  #scrollAnchor,
  #resultsPageHeading,
  #companyLogo {
    display:none !important;
  }
 
  #pdfHeader{
    display:block !important;
  }

  /* ===== COVER PAGE (page 1): logo → title → score → adviser contact ===== */
  #pdfHeader{
    text-align:center;
    padding-top:40px;
  }

  #pdfReportTitle{
    margin-top:10px !important;
  }

  #pdfAdviserContact{
    display:block !important;
    text-align:center;
    font-size:13px;
    color:#555;
    margin-top:18px;
    padding-bottom:40px;
    break-after:page;
    page-break-after:always;
  }
 
  h3.section-title{
    font-size:20px;
    margin-top:30px;
    border-bottom:2px solid var(--primary-colour);
    padding-bottom:6px;
  }

  /* Summary gets its own page, on its own */
  .summary-box{
    break-after:page;
    page-break-after:always;
  }

  /* What This Means / Where You Could Strengthen / Financial Flexibility
     stay together on one page (no breaks between them) - the last of the
     three (Financial Flexibility) forces a break after itself so Your
     Protection Analysis starts fresh. */
  .opportunity-box{
    break-after:page;
    page-break-after:always;
  }

  /* Budget Breakdown starts a clean new page, with real top padding since
     @page margin already gives every page consistent breathing room at its
     edges. Protection Analysis follows immediately after the
     opportunity-box above, which already forces its own break-after - a
     break-before here too would double up and produce a blank page between
     them, so Protection Analysis only gets top padding, not a forced break. */
  #budgetBreakdownHeading{
    break-before:page;
    page-break-before:always;
    padding-top:10px;
  }

  #protectionAnalysisHeading{
    padding-top:10px;
  }
 
  .box{
    margin-top:15px;
    padding:16px;
    border-radius:8px;
    break-inside:avoid;
    page-break-inside:avoid;
  }
 
 
.fade-in{
  opacity:1 !important;
  transform:none !important;
  display:block !important;
}
 
body *{
  transform:none !important;
}
 
.highlight{
  padding:18px;
  font-size:16px;
  background:var(--primary-colour); !important;
  color:#fff !important;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
 
.risk{
  font-size:18px;
  padding:20px;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
 
.box{
  break-inside: avoid;
  page-break-inside: avoid;
}
 
.result{
  page-break-before: auto;
}
 
#out{
  display:block;
  padding:0 !important;
  border-radius:0 !important;
}
 
.wrapper{
  padding:0 !important;
}
 
 
.fade-in{
  opacity: 1 !important;
  transform: none !important;
  display: block !important;
}
 
*{
  animation: none !important;
  transition: none !important;
}
  
}
 
@media (max-width: 600px){
 
  .text-block,
  .box,
  .result,
  .highlight,
  .section-title {
    text-align: center;
  }
 
  .section-title {
    margin-bottom: 12px;
  }
 
  label {
    margin-top: 18px;
  }
 
  .btn,
  .btn-secondary {
    text-align: center;
  }
 
}
`;

  // 2. YOUR HTML GOES HERE, AS A STRING

const WIDGET_HTML = `
  <div class="wrapper">

<div id="companyLogo" style="text-align:center; margin-top:20px; margin-bottom:15px;"></div>

<div id="introText" style="text-align:left; margin:0 0 25px; padding:18px 22px; color:#333; font-size:15px; line-height:1.5; border:2px solid var(--primary-colour); border-radius:10px; background:#fafafa; box-sizing:border-box;"></div>

<input id="e1" type="hidden">
 
<div id="scrollAnchor" style="height:60px;"></div>
 
<div id="progressBar" class="progress-wrap">
 
  <div class="progress-text">
    Step 1 of 5
  </div>
 
  <div class="progress-dots">
    <div class="dot active"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
 
</div>
 
<div id="saveStatus"
     style="
       text-align:center;
       font-size:13px;
       color:#1e8449;
       margin-bottom:5px;
       min-height:18px;
     ">
</div>

<div id="tabOnlyNotice"
     style="
       text-align:center;
       font-size:12px;
       color:#888;
       margin-bottom:15px;
     ">
  Your progress is saved to this tab only - if you close it, you'll need to start again.
</div>

<div class="step active" id="step1" style="display:block">
 
<h3 class="section-title">About You</h3>
 
<div class="card">

<div id="chosenAdviserRow" style="display:none;">
  <label>Select your Adviser</label>
  <select id="chosenAdviserId" autocomplete="off">
    <option value="">No preference</option>
  </select>
</div>
 
<label>Your Name</label>
<input id="clientName" placeholder="Enter full name">

<label>Your Email</label>
<input id="clientEmail" type="email" placeholder="you@example.com">
 
<label>Current Age</label>
<input id="a1">
 
<label>Retirement Age</label>
<input id="r1">
 
<label>Are you currently earning an income?</label>
<select id="isWorking">
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>
 
<label>Do you have or are you applying for a mortgage?</label>
<select id="hasMortgage">
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>

<label>Is there anyone you would want to leave your home to mortgage-free?</label>
<select id="dep">
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>
 
<label>Do you have any existing protection (life, critical illness or income protection)?</label>
<select id="hasProtection" autocomplete="off">
  <option value="yes">Yes</option>
  <option value="no">No</option>
</select>
 
</div>
 
<button class="btn" onclick="goToStep(2)">Next</button>
 
</div>
  
<div class="step" id="step2" style="display:none">
 
<h3 class="section-title">Income & Savings</h3>
 
<div class="card">
 
<div id="incomeFields">
 
<label>Gross Annual Income (£)</label>
<input id="g1">
 
</div>

<label id="netIncomeLabel">Monthly Net Income (take-home pay) (£)</label>
<input id="n1">
<div id="netIncomeHelp" style="font-size:13px;color:#666;margin-top:4px;display:none;">
  Include any income that covers your share of household expenses - for example a partner's income, benefits, or maintenance.
</div>
 
<label>Total Savings (£)</label>
<input id="s1">
 
</div>
 
<button class="btn" onclick="goToStep(3)">Next</button>
<button class="btn-secondary" onclick="goToStep(1)">Back</button>
 
</div>
 
<div class="step" id="step3" style="display:none">
 
  <h3 class="section-title">Monthly Expenses - Housing</h3>
 
  <div class="card">
 
    <h5 data-section="housing">
      <span>🏡 Housing</span>
    </h5>
 
    <div id="housing" class="section"></div>
 
  </div>
 
  <button class="btn" onclick="goToStep(4)">Next</button>
  <button class="btn-secondary" onclick="goToStep(2)">Back</button>
 
</div>
 
<div class="step" id="step4" style="display:none">
 
<h3 class="section-title">Monthly Expenses - Living Costs</h3>
 
<div class="card">
 
<h5 data-section="living"><span>🛒 Living</span></h5>
<div id="living" class="section"></div>
 
</div>
 
<button class="btn" onclick="goToStep(5)">Next</button>
<button class="btn-secondary" onclick="goToStep(3)">Back</button>
 
</div>
 
<div class="step" id="step5" style="display:none">
 
<h3 class="section-title">Monthly Expenses - Lifestyle</h3>
 
<div class="card">
 
<h5 data-section="lifestyle"><span>🎯 Lifestyle</span></h5>
<div id="lifestyle" class="section"></div>
 
</div>
 
<button class="btn" onclick="goToStep(6)">Next</button>
<button class="btn-secondary" onclick="goToStep(4)">Back</button>
 
</div>
 
<div class="step" id="step6" style="display:none">
 
<h3 class="section-title">Monthly Expenses - Commitments</h3>
 
<div class="card">
 
<h5 data-section="commitments"><span>📄 Commitments</span></h5>

<div id="commitments" class="section"></div>
 
</div>
 
<button class="btn" onclick="goToStep(7)">Next</button>
<button class="btn-secondary" onclick="goToStep(5)">Back</button>
 
</div>

<div class="step" id="step6a" style="display:none">

<h3 class="section-title">Available Income</h3>

<div class="card">

<div class="text-block" style="text-align:center; margin-bottom:15px;">
  Based on your income and expenses, here's what you have available each month.
</div>

<div style="text-align:center; margin-bottom:15px;">
  <div style="font-size:42px; font-weight:700; color:var(--primary-colour); line-height:1;">
    £<span id="availableIncomeDisplay">0</span>
  </div>
  <div style="margin-top:8px; font-weight:600;">
    Available every month
  </div>
</div>

<div class="text-block" style="text-align:center;">
  If this doesn't look right, use Back to review your expenses.
</div>

</div>

<button id="calcBtn" class="btn">Get My Score</button>
<button class="btn-secondary" onclick="goToStep(8)">Back</button>

</div>

<div class="step" id="step7" style="display:none">
 
<h3 class="section-title">Current Mortgage</h3>
 
<div class="card">
 
<label>Current/New Mortgage Balance (£)</label>
<div class="input-wrap">
  <span>£</span>
  <input id="m">
</div>
 
<label>Current/New Term (years)</label>
<input id="mt">
 
</div>
 
<button class="btn" onclick="goToStep(8)">Next</button>
<button class="btn-secondary" onclick="goToStep(6)">Back</button>
 
</div>
 
 
<div class="step" id="step8" style="display:none">
 
  <h3 class="section-title">Existing Protection</h3>
 
  <div class="card">

    <div id="noProtectionMessage" style="display:none;text-align:center;padding:10px 0;">
      <div style="font-size:15px;color:#555;">
        You haven't indicated any existing protection or employment income, so there's nothing to review here.
      </div>
      <div style="font-size:15px;color:#555;margin-top:6px;">
        Click "Get My Score" below to continue.
      </div>
    </div>
 
<div id="lifeCicSelectionBlock">
  <label>Do you have any life cover or critical illness cover?</label>
  <select id="lifeCicSelection" autocomplete="off">
    <option value="">Select an option</option>
    <option value="none">Neither of these</option>
    <option value="life_only">Life Cover Only</option>
    <option value="ci_only">Critical Illness Cover Only</option>
    <option value="both_separate">Both - Separate Policies</option>
    <option value="both_combined">Both - One Combined Policy</option>
  </select>
</div>

    <div id="lifeCoverBlock" style="display:none;">
 
      <label>Life Cover Amount for Mortgage (£)</label>
      <input id="l1">
 
      <label>Years Remaining</label>
      <input id="lt1">

      <div id="lifePremiumRow" style="display:none;">
        <label>Life Cover for Mortgage - Monthly Premium (£)</label>
        <input id="lifePremium">
      </div>
 
    </div>
 
<div id="ciCoverBlock" style="display:none;">
 
  <label>Critical Illness Cover Amount for Mortgage (£)</label>
  <input id="c1">
 
  <label>Years Remaining</label>
  <input id="ct1">

  <div id="ciPremiumRow" style="display:none;">
    <label>Critical Illness Cover for Mortgage - Monthly Premium (£)</label>
    <input id="ciPremium">
  </div>

  <div id="combinedPremiumRow" style="display:none;">
    <label>Combined Life and Critical Illness Cover for Mortgage - Monthly Premium (£)</label>
    <input id="combinedPremium">
  </div>
 
</div>
 
    <div id="ipFields">
 
      <label>Current Income Protection Benefit - what you receive (£)</label>
      <input id="ip1">
 
      <label>Income Protection Ends (Age)</label>
      <input id="ipe">

      <label>Income Protection - Monthly Premium (£)</label>
      <input id="ipPremium">
 
<label>Claim Period</label>
<select id="ipClaim" autocomplete="off">
  <option value="">Select claim period</option>
  <option value="Full-term">Full-Term</option>
  <option value="5">5 Years</option>
  <option value="2">2 Years</option>
  <option value="1">1 Year</option>
</select>


      <label>Deferred Period</label>
      <select id="d1" autocomplete="off">
        <option value="">Select deferred period</option>
        <option value="4">4 weeks</option>
        <option value="8">8 weeks</option>
        <option value="13">13 weeks</option>
        <option value="26">26 weeks</option>
        <option value="52">52 weeks</option>
      </select>
 
    </div>
 
    <div id="sickPayBlock">
 
      <label>Sick Pay</label>
      <select id="sp1" autocomplete="off">
        <option value="">Select sick pay</option>
        <option value="0">0 weeks</option>
        <option value="1">1 week</option>
        <option value="2">2 weeks</option>
        <option value="3">3 weeks</option>
        <option value="4">4 weeks</option>
        <option value="5">5 weeks</option>
        <option value="6">6 weeks</option>
        <option value="7">7 weeks</option>
        <option value="8">8 weeks</option>
        <option value="9">9 weeks</option>
        <option value="10">10 weeks</option>
        <option value="11">11 weeks</option>
        <option value="12">12 weeks</option>
        <option value="13">13 weeks</option>
        <option value="14">14 weeks</option>
        <option value="15">15 weeks</option>
        <option value="16">16 weeks</option>
        <option value="17">17 weeks</option>
        <option value="18">18 weeks</option>
        <option value="19">19 weeks</option>
        <option value="20">20 weeks</option>
        <option value="21">21 weeks</option>
        <option value="22">22 weeks</option>
        <option value="23">23 weeks</option>
        <option value="24">24 weeks</option>
        <option value="25">25 weeks</option>
        <option value="26">26 weeks</option>
      </select>
 
    </div>

    <div id="deferredBanner"></div>
 
  </div>
 
 
  <button class="btn" onclick="goToStep('6a')">Next</button>
  <button class="btn-secondary" onclick="backFromProtection()">Back</button>
 
</div>

<div class="step" id="stepModelUpdate" style="display:none">

<h3 class="section-title" id="modelUpdateHeading">What-If Calculator</h3>

<div class="card">

<div class="text-block" style="text-align:center;margin-bottom:15px;" id="modelUpdateIntro">
  Exploring different scenarios for <b id="modelUpdateClientName">this client</b>. Nothing here is saved - adjust
  the figures below and see how the score would change.
</div>

<div id="modelUpdateFields"></div>

</div>

<button id="modelUpdateRecalcBtn" class="btn">See Updated Score</button>

</div>

<div class="step" id="stepAutoUpdate" style="display:none">

<div class="card" style="text-align:center;">

<div style="width:40px;height:40px;border:4px solid #eef3ff;border-top:4px solid var(--primary-colour);border-radius:50%;margin:10px auto 20px;animation:spin 1s linear infinite;"></div>

<div class="text-block" style="margin-bottom:10px;">
  Recalculating <b id="autoUpdateClientName">this client</b>'s score based on their confirmed policies...
</div>

<div id="autoUpdateStatus"></div>

</div>

</div>
 
<div class="step" id="resultsPage" style="display:none">
 
<h3 class="section-title" id="resultsPageHeading">Your Results</h3>
<div id="pdfHeader" style="display:none;">
<div id="pdfLogoContainer"></div> 
  <div style="text-align:center;margin-bottom:20px;">
     
<h1 id="pdfReportTitle"
    style="margin:0;color:var(--primary-colour);font-size:26px;">
</h1>
     
<div id="pdfCompanyDetails"
     style="margin-top:5px;font-size:12px;color:#666;">
</div>
 
  </div>
 
  <hr style="border:none;border-top:2px solid var(--primary-colour); margin:20px 0;">
 
</div>
  
<div id="resultActions">
 
  <button id="pdfBtn" class="btn-secondary">
    Download Report
  </button>
   
<button id="bookConsultBtn" onclick="bookConsultation()" class="btn-secondary">
    Book Consultation
</button>

<button id="tryAgainBtn" onclick="backToCalculator()" class="btn-secondary" style="display:none;">
    Try Different Numbers
</button>

</div>
  
<div id="scoreBox"></div>
<div id="pdfAdviserContact" style="display:none;"></div>
<div id="out"></div>
 
 
</div>
  `;

  // 3. INJECT CSS + HTML INTO THE PAGE

  function injectWidget(){

    let target = document.getElementById("resilience-tool");
    if(!target){
      console.error("No element with id='resilience-tool' found on this page.");
      return;
    }

    let styleTag = document.createElement("style");
    styleTag.textContent = WIDGET_CSS;
    document.head.appendChild(styleTag);

    target.innerHTML = WIDGET_HTML;

  }

  injectWidget();

const EXPENSE_DATA = {
  housing: [
    { label: "Monthly Rent / Mortgage Payment", helperText: "If you're applying for a new mortgage, enter what you expect to pay each month once it's in place." },
    { label: "Council Tax" },
    { label: "Utilities (Electricity/Gas/Oil/Water)" },
    { label: "Broadband & TV" },
    { label: "Home Insurance" },
    { label: "Service Charge / Ground Rent / Shared Ownership Rent" }
  ],
  living: [
    { label: "Food & Groceries" },
    { label: "Travel Costs (fuel, public transport)" },
    { label: "Car Maintenance (servicing, MOT & insurance)" },
    { label: "Childcare", id: "childcareBlock" },
    { label: "Clothing" }
  ],
  lifestyle: [
    { label: "Recreation" },
    { label: "Holidays" },
    { label: "Subscriptions & Memberships (Netflix, Amazon, Gym membership etc.)" },
    { label: "Any Other Spending e.g. maintenance, prescriptions, pet insurance, gardener/cleaner etc." }
  ],
  commitments: [
    { label: "Personal Loans (monthly payment)" },
    { label: "Car Finance (monthly payment)" },
    { label: "Credit Cards (monthly payment)" }
  ]
};


function getBrandFromUrl() {

  const host = window.location.hostname;
  const path = window.location.pathname;

  const companySlug = host.split(".")[0];

  const adviserSlug = path
    .replace(/\//g,"")
    .toLowerCase();

  
const advisers = {

  "abcmortgages-john_smith": {

    companyName: "ABC Mortgages",

    primaryColour: "#132869",
    secondaryColour: "#facf39",

    logoUrl: "https://yourdomain.co.uk/logo.png",

    adviserName: "John Smith",

    adviserEmail: "john@abc.co.uk",

    bookingUrl: "https://calendly.com/john"

  }

};

  const key =
    companySlug +
    "-" +
    adviserSlug.replace("-","_");


return advisers[key] || {
  companyName: "Resilience Tool",

  primaryColour: "#132869",
  secondaryColour: "#facf39",

  logoUrl: "",

  adviserName: "Adviser",
  adviserEmail: "hello@resiliencetool.co.uk",
  bookingUrl: "#"
};

}

let BRAND = {
  companyName: "Resilience Tool",
  primaryColour: "#132869",
  secondaryColour: "#facf39",
  logoUrl: "",
  adviserName: "Adviser",
  adviserEmail: "hello@resiliencetool.co.uk",
  bookingUrl: "#"
};

// Populated only for a shared-inbox embed (see loadBrandFromSupabase) -
// the list of other real advisers a client can optionally choose from.
let SHARED_INBOX_ADVISERS = [];

async function loadBrandFromSupabase(){
  let target = document.getElementById("resilience-tool");
  let clientSlug = target?.getAttribute("data-client") || "";
  if(!clientSlug){
    console.warn("No data-client attribute found - using default branding.");
    return;
  }
  let { data, error } = await supabaseClient
    .from("advisers")
    .select(`
      id,
      company_id,
      adviser_name,
      adviser_email,
      adviser_phone,
      booking_url,
      is_shared_inbox,
      companies (
        company_name,
        primary_colour,
        secondary_colour,
        logo_url
      )
    `)
    .eq("adviser_slug", clientSlug)
    .single();
  if(error || !data){
    console.warn("Could not load client branding - using default branding.", error);
    return;
  }
  BRAND = {
    companyId: data.company_id,
    adviserId: data.id,
    companyName: data.companies.company_name,
    primaryColour: data.companies.primary_colour,
    secondaryColour: data.companies.secondary_colour,
    logoUrl: data.companies.logo_url || "",
    adviserName: data.adviser_name,
    adviserEmail: data.adviser_email,
    adviserPhone: data.adviser_phone || "",
    bookingUrl: data.booking_url,
    isSharedInbox: !!data.is_shared_inbox
  };

  // Short-term delegation option - only ever relevant for a shared-inbox
  // embed (e.g. info@), never for a normal personal adviser link. Loads
  // the company's other real, active advisers so the client can optionally
  // pick a specific person; if they don't, BRAND simply keeps the shared
  // inbox's own details, exactly as if this never ran.
  if(BRAND.isSharedInbox){
    let { data: siblingAdvisers, error: siblingError } = await supabaseClient
      .from("advisers")
      .select("id, adviser_name, adviser_email, adviser_phone, booking_url")
      .eq("company_id", BRAND.companyId)
      .eq("active", true)
      .eq("is_shared_inbox", false)
      .order("adviser_name", { ascending: true });

    if(!siblingError && siblingAdvisers){
      SHARED_INBOX_ADVISERS = siblingAdvisers;
    }
  }
}

const STORAGE_KEY =
`${window.location.hostname}${window.location.pathname}`;


function renderExpenseItem(item){
  return `
      <div class="exp"${item.id ? ` id="${item.id}"` : ""}>
        <label>${item.label}</label>
        ${item.helperText ? `<div style="font-size:13px;color:#666;margin-top:4px;">${item.helperText}</div>` : ""}
        <div class="input-wrap">
          <span>£</span>
          <input class="amt"${item.placeholder ? ` placeholder="${item.placeholder}"` : ""}>
        </div>
        <div class="toggle">
          <span class="on">Essential</span>
          <span>Flexible</span>
          <span>Non-essential</span>
        </div>
        <div class="flex-slider">
          <input type="range" min="0" max="100" step="5" value="50">
          <div class="small"></div>
        </div>
      </div>`;
}

function renderExpenseSections(){
  Object.keys(EXPENSE_DATA).forEach(sectionId => {
    let container = document.getElementById(sectionId);
    if(!container) return;
    container.innerHTML = EXPENSE_DATA[sectionId].map(renderExpenseItem).join("");
  });
}

function safe(fn){
  try {
    return fn();
  } catch(e){
    console.error("SAFE ERROR:", e);
    return null;
  }
}

function clean(val){
  return (val || "").toString().replace(/,/g,"");
}

function num(val){
  return parseFloat(clean(val)) || 0;
}


function saveProgress(){

  // Calculator mode is explicitly "nothing here is saved," and Model an
  // Update saves via its own explicit saveSubmission() call - neither
  // should ever write to the shared sessionStorage draft key. Without this
  // guard, syncing a Calculator clone field back to its real original
  // (see cloneExpenseFieldForCalculator/cloneProtectionFieldForCalculator)
  // dispatches a real "input" event, which bubbles to the document-wide
  // listener and calls this function - silently overwriting the shared
  // draft that a completely different, fresh assessment at the same
  // adviser URL would later restore from.
  if(CALCULATOR_MODE || MODEL_UPDATE) return;

  try {

    let data = {};

    // Save all fields with IDs
    document.querySelectorAll("input, select").forEach(el => {

      if(el.id){
        data[el.id] = el.value;
      }

    });

    // Save expense planner entries
    document.querySelectorAll(".exp").forEach(function(exp,index){

      var active = exp.querySelector(".toggle .on");

      data["exp_" + index] = {
        amount: exp.querySelector(".amt")
          ? exp.querySelector(".amt").value
          : "",

        toggle: active
          ? active.innerText
          : "Essential",

        slider: exp.querySelector('input[type="range"]')
          ? exp.querySelector('input[type="range"]').value
          : 50
      };

    });

// sessionStorage (not localStorage) - progress is only ever restorable
// within the SAME tab for the SAME visitor. A new tab (e.g. a second
// person opening the same adviser link on a shared device) gets a
// completely empty sessionStorage and starts fresh, while the original
// client can still navigate back/forward and edit their own answers as
// long as they keep this tab open. Closing the tab clears it - the
// tab-only notice in WIDGET_HTML tells the client this up front.
sessionStorage.setItem(
  STORAGE_KEY,
  JSON.stringify(data)
);

    let status = document.getElementById("saveStatus");

    if(status){

      status.textContent =
        "✓ Progress automatically saved";

      clearTimeout(window.saveTimer);

      window.saveTimer = setTimeout(() => {
        status.textContent = "";
      }, 2000);

    }

  } catch(e) {

    console.error("SAVE ERROR", e);

  }

}


function loadProgress(){

  let saved;

  try {

    saved = 
sessionStorage.getItem(
  STORAGE_KEY
);

  } catch(e) {

    console.error("LOAD ERROR", e);
    return;

  }

  if(!saved) return;

  let data = JSON.parse(saved);

  document.querySelectorAll("input, select").forEach(el => {

    if(
      el.id &&
      data[el.id] !== undefined
    ){
      el.value = data[el.id];
    }

  });

  document.querySelectorAll(".exp").forEach((exp,index)=>{

    let item = data["exp_" + index];

    if(!item) return;

    let buttons =
      exp.querySelectorAll(".toggle span");

    buttons.forEach(btn => {

      btn.classList.remove("on");

      if(btn.innerText === item.toggle){
        btn.classList.add("on");
      }

    });


let amountInput =
  exp.querySelector(".amt");

if(amountInput){
  amountInput.value = item.amount || "";
}

let slider =
  exp.querySelector('input[type="range"]');

if(slider){
  slider.value = item.slider;
}

if(item.toggle === "Flexible"){

  let sliderWrap =
    exp.querySelector(".flex-slider");

  if(sliderWrap){
    sliderWrap.style.display = "block";
  }

  updateFlexSliderDisplay(exp);

}

  });

// Setting .value directly above doesn't fire real "input" events, and
// plannerData.step3-6 are only ever populated by that event listener (or
// by generateAnalysis()/prefillFormFromData() explicitly) - without this,
// calcBudget() sums from plannerData's still-empty startup arrays, so
// Available Income silently computes as Net Income minus zero expenses on
// any fresh page load that restores progress via this function, even
// though every field is visibly filled in on screen.
plannerData.step3 = getStepData(3);
plannerData.step4 = getStepData(4);
plannerData.step5 = getStepData(5);
plannerData.step6 = getStepData(6);

calcBudget();
}

function clearProgress(){
 
sessionStorage.removeItem(
  STORAGE_KEY
);

  location.reload();

}


safe(() => {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
});


let plannerData = {
  step3: [],
  step4: [],
  step5: [],
  step6: []
};


function getStepData(stepId){

  let stepEl = document.getElementById("step" + stepId);
  if(!stepEl) return [];

  let data = [];

  stepEl.querySelectorAll(".exp").forEach(e => {

    try {

      let label = e.querySelector("label")?.innerText || "";

      let inputs = Array.from(e.querySelectorAll(".amt"));

      if(inputs.length === 0){
        return;
      }

      let val = 0;
      inputs.forEach(input => {
        val += num(clean(input.value));
      });

      let activeToggle = e.querySelector(".toggle .on") || {
        innerText: "Non-essential"
      };

      let type = "Non-essential";

      if(val > 0){
        type = activeToggle?.innerText || "Non-essential";
      }

      let slider = e.querySelector('input[type="range"]');
      let pct = slider ? parseFloat(slider.value) : 100;

      data.push({
        label,
        value: val,
        type,
        pct
      });

    } catch(err){
      console.error("EXP ERROR", err, e);
    }

  });

  return data;
}


function toggleProtectionFields(){

  let hasProtection = document.getElementById("hasProtection")?.value === "yes";

  let selectionBlock = document.getElementById("lifeCicSelectionBlock");
  let ipBlock = document.getElementById("ipFields");

  if(!hasProtection){

    if(selectionBlock) selectionBlock.style.display = "none";
    if(ipBlock) ipBlock.style.display = "none";

    if(document.getElementById("lifeCicSelection")) document.getElementById("lifeCicSelection").value = "";

    ["l1","lt1","lifePremium","c1","ct1","ip1","ipe","d1","ipClaim","ciPremium","ipPremium","combinedPremium"].forEach(id=>{
      let el = document.getElementById(id);
      if(el) el.value = "";
    });

  } else {

    if(selectionBlock) selectionBlock.style.display = "block";
    // IP depends only on hasProtection, not working status - an old IP
    // policy taken out while employed could still be in force and worth
    // recording even if the client isn't currently working.
    if(ipBlock) ipBlock.style.display = "block";
  }

  updateNoProtectionMessage();
  updateLifeCicFieldsFromSelection();
}

// Step 8 can end up with every field hidden simultaneously - hasProtection
// "no" hides Life/CIC/IP, and isWorking "no" hides the only remaining
// field (Sick Pay) - leaving what looked like a blank, broken card. Rather
// than skipping the step (which would remove the client's own "Get My
// Score" action entirely), this just explains why the card is empty and
// keeps the normal button in place.
function updateNoProtectionMessage(){
  let hasProtection = document.getElementById("hasProtection")?.value === "yes";
  let isWorking = document.getElementById("isWorking")?.value === "yes";
  let msg = document.getElementById("noProtectionMessage");
  if(msg){
    msg.style.display = (!hasProtection && !isWorking) ? "block" : "none";
  }
}

function toggleIncomeFields(){

  let isWorking = document.getElementById("isWorking")?.value === "yes";
  let incomeBlock = document.getElementById("incomeFields");
  let netIncomeLabel = document.getElementById("netIncomeLabel");
  let netIncomeHelp = document.getElementById("netIncomeHelp");

  if(!incomeBlock) return;

  if(isWorking){
    incomeBlock.style.display = "block";
    if(netIncomeLabel) netIncomeLabel.textContent = "Monthly Net Income (take-home pay) (£)";
    if(netIncomeHelp) netIncomeHelp.style.display = "none";
  } else {
    incomeBlock.style.display = "none";

    // Not working doesn't mean no income - a partner's income, benefits,
    // or maintenance can still support this person's share of expenses and
    // any protection premiums, and they may still have a real need for
    // life/critical illness cover if they have a mortgage or dependants.
    // Only the employment-specific gross income field is cleared here
    // (it solely drives the Income Protection benefit calculation, which
    // genuinely has no meaning without employment) - net income stays
    // editable so someone not working, e.g. a full-time parent or someone
    // unable to work, isn't blocked from a Life/CIC/Emergency Fund
    // assessment just because they have no employment income of their own.
    if(document.getElementById("g1")) document.getElementById("g1").value = "";

    if(netIncomeLabel) netIncomeLabel.textContent = "Monthly Income Available to You (£)";
    if(netIncomeHelp) netIncomeHelp.style.display = "block";
  }
}

// Sick pay is an employer benefit - it genuinely doesn't apply if there's
// no current employer, so (unlike Life/CIC/IP) this one DOES depend on
// working status, and is the only field that owns this particular toggle.
function toggleSickPay(){

  let isWorking = document.getElementById("isWorking")?.value === "yes";
  let block = document.getElementById("sickPayBlock");

  if(!block) return;

  if(isWorking){
    block.style.display = "block";
  } else {
    block.style.display = "none";

    let input = document.getElementById("sp1");
    if(input) input.value = "";
  }

  updateNoProtectionMessage();
}

function toggleChildcare(){

  let hasDep = document.getElementById("dep")?.value === "yes";
  let block = document.getElementById("childcareBlock");

  if(!block) return;

  if(hasDep){
    block.style.display = "block";
  } else {
    block.style.display = "none";

    let input = block.querySelector(".amt");
    if(input) input.value = "";
  }
}

// Field visibility is now driven entirely by the client's explicit answer
// to "Which type of protection do you have?" - never inferred from typed
// amounts. This replaces the old approach, which tried to guess relevance
// from whatever numbers happened to be in the Life/CIC amount fields and
// only asked about combined/separate cover as an awkward secondary
// question that didn't make sense for someone with just one type of cover.
function updateLifeCicFieldsFromSelection(){

  let selection = document.getElementById("lifeCicSelection")?.value || "";

  let lifeCoverBlock = document.getElementById("lifeCoverBlock");
  let ciCoverBlock = document.getElementById("ciCoverBlock");
  let lifePremiumRow = document.getElementById("lifePremiumRow");
  let ciPremiumRow = document.getElementById("ciPremiumRow");
  let combinedPremiumRow = document.getElementById("combinedPremiumRow");

  let showLife = selection === "life_only" || selection === "both_separate" || selection === "both_combined";
  let showCI = selection === "ci_only" || selection === "both_separate" || selection === "both_combined";
  let showLifePremium = selection === "life_only" || selection === "both_separate";
  let showCIPremium = selection === "ci_only" || selection === "both_separate";
  let showCombinedPremium = selection === "both_combined";

  if(lifeCoverBlock) lifeCoverBlock.style.display = showLife ? "block" : "none";
  if(ciCoverBlock) ciCoverBlock.style.display = showCI ? "block" : "none";
  if(lifePremiumRow) lifePremiumRow.style.display = showLifePremium ? "block" : "none";
  if(ciPremiumRow) ciPremiumRow.style.display = showCIPremium ? "block" : "none";
  if(combinedPremiumRow) combinedPremiumRow.style.display = showCombinedPremium ? "block" : "none";

  // Clear whatever's no longer relevant, matching the same clear-on-hide
  // pattern already used throughout this step - switching from "Life Cover
  // Only" to "Critical Illness Cover Only", for example, shouldn't leave a
  // stale Life amount sitting in the background still counting toward the
  // client's score.
  if(!showLife){
    if(document.getElementById("l1")) document.getElementById("l1").value = "";
    if(document.getElementById("lt1")) document.getElementById("lt1").value = "";
  }
  if(!showLifePremium && document.getElementById("lifePremium")) document.getElementById("lifePremium").value = "";

  if(!showCI){
    if(document.getElementById("c1")) document.getElementById("c1").value = "";
    if(document.getElementById("ct1")) document.getElementById("ct1").value = "";
  }
  if(!showCIPremium && document.getElementById("ciPremium")) document.getElementById("ciPremium").value = "";

  if(!showCombinedPremium && document.getElementById("combinedPremium")) document.getElementById("combinedPremium").value = "";
}

// Life cover's own field visibility is now entirely driven by the "Which
// type of protection do you have?" selection - this just re-applies
// whatever that selection currently is. Kept as a function (rather than
// removed) so the existing dep/hasMortgage change listeners that already
// call it elsewhere continue to work without needing to be found and edited.
function toggleLifeCover(){
  updateLifeCicFieldsFromSelection();
}

function showMessage(msg){

  document.getElementById("scoreBox").innerHTML = "";

  document.getElementById("out").innerHTML = `
    <div class="box" style="border:2px solid #e67e22;background:#fff8f2;">
      ${msg}
    </div>
  `;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function savePDF(){

  let fullName = document.getElementById("clientName")?.value || "Client";
  document.title = `${fullName}'s Financial Resilience Report`;

  
let nameEl = document.getElementById("pdfClientName");

if(nameEl){
    nameEl.innerText = fullName;
}

let companyEl = document.getElementById("pdfCompanyName");

if(companyEl){
    companyEl.innerText = BRAND.companyName;
}

let logoContainer =
  document.getElementById("pdfLogoContainer");

if(
  logoContainer &&
  BRAND.logoUrl
){
  
logoContainer.innerHTML = `
<img
  src="${BRAND.logoUrl}"
  style="
    max-width:220px;
    max-height:80px;
    display:block;
    margin:0 auto 20px;
  "
>
`;

}

  window.scrollTo(0,0);


setTimeout(() => {
  window.print();
  // Deliberately NOT resetting document.title back to the company name
  // here. window.print() is a blocking call on desktop, so the reset
  // used to be safe - but on mobile, print/save-as-PDF is often
  // asynchronous (opens a system share sheet), so this line could fire
  // before the person had actually finished choosing "Save as PDF",
  // silently swapping the saved filename from the client's name to the
  // company name. Leaving the title as the client's report name has no
  // real downside - it just stays accurate.
}, 300);

}

async function saveSubmission(analysis){
  try {
    let reportHtml = document.getElementById("out")?.innerHTML || "";

    let response = await fetch("/.netlify/functions/save-submission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyId: BRAND.companyId || null,
        adviserId: BRAND.adviserId || null,
        clientName: analysis.fullName || "",
        clientEmail: document.getElementById("clientEmail")?.value || "",
        reportHtml: reportHtml,
        rawInputs: getFormData(),
        score: analysis.base.currentScore || null,
        parentSubmissionId: MODEL_UPDATE ? MODEL_UPDATE.submissionId : null,
        skipClientEmail: !!MODEL_UPDATE
      })
    });

    // fetch() only throws on a genuine connection failure — it does NOT
    // throw when the server itself responds with an error (e.g. a failed
    // database insert). Previously that meant a server-side failure was
    // silently treated as a success here, with nothing surfaced to the
    // caller at all.
    if(!response.ok){
      let errorText = await response.text().catch(() => "");
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

  } catch(err){
    console.error("Failed to save submission:", err);
    throw err;
  }
}

function getDisplayStep(step){
  if(step === "resultsPage") return 5;

  if(step === "6a") return 5;

  if(typeof step !== "number") return 1;

  if(step === 1) return 1;
  if(step === 2) return 2;

  if(step >= 3 && step <= 6) return 3;

  if(step === 7) return 4;
  if(step === 8) return 5;

  return step;
}

function validateStep(currentStep){



if(currentStep === 1){

  let stepEl = document.getElementById("step1");

  stepEl.querySelectorAll(".error-box").forEach(e => e.remove());

let name = document.getElementById("clientName").value.trim();
let email = document.getElementById("clientEmail").value.trim();
let age = num(document.getElementById("a1").value);
let retirement = num(document.getElementById("r1").value);

if(name === ""){
  showStepError(stepEl, "Please enter your name");
  return false;
}

if(email === "" || !email.includes("@") || !email.includes(".")){
  showStepError(stepEl, "Please enter a valid email address");
  return false;
}

if(age < 18 || age > 75){
  showStepError(
    stepEl,
    "Please enter an age between 18 and 75"
  );
  return false;
}

if(retirement < 50 || retirement > 80){
  showStepError(
    stepEl,
    "Please enter a retirement age between 50 and 80"
  );
  return false;
}

if(retirement <= age){
  showStepError(
    stepEl,
    "Retirement age must be higher than current age"
  );
  return false;
}

  return true;
}

if(currentStep === 2){

  let isWorking = document.getElementById("isWorking")?.value === "yes";

  if(isWorking && !document.getElementById("g1").value){
    showMessage("<b>Please enter your gross income</b>");
    return false;
  }

  // Required regardless of employment status - someone not working may
  // still have a partner's income, benefits, or other income supporting
  // their expenses, and the affordability/Emergency Fund calculations
  // need a real figure to work from either way.
  if(!document.getElementById("n1").value){
    showMessage(isWorking
      ? "<b>Please enter your monthly income</b>"
      : "<b>Please enter the monthly income available to you</b>"
    );
    return false;
  }

  return true;
}

if(currentStep >= 3 && currentStep <= 6){

  let stepEl = document.getElementById("step" + currentStep);

  stepEl.querySelectorAll(".error-box").forEach(e => e.remove());

  let missing = false;

  stepEl.querySelectorAll(".exp").forEach(exp => {

    let isHidden = exp.offsetParent === null;
    if(isHidden) return;

    let input = exp.querySelector(".amt");

    if(input && input.value.trim() === ""){
      missing = true;
    }

  });

  if(missing){

    let box = document.createElement("div");
    box.className = "box error-box";
    box.style.border = "2px solid #e67e22";
    box.style.background = "#fff8f2";
    box.style.marginTop = "15px";

    box.innerHTML = `
      <b>Please enter an amount for every expense</b><br><br>
      If something doesn't apply to you, enter 0.
    `;

    stepEl.querySelector(".card").appendChild(box);

    box.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    return false;
  }

}
  
if(
  currentStep === 7 &&
  document.getElementById("hasMortgage")?.value === "yes"
){

  if(!v("m")){
    showMessage("<b>Please enter your mortgage balance</b>");
    return false;
  }

  if(!v("mt")){
    showMessage("<b>Please enter your remaining mortgage term</b>");
    return false;
  }

}
  
if(currentStep === 8){

  // Calculator mode hides the real Step 8 entirely and shows a cloned
  // screen instead - appending error messages to the real, invisible
  // step8 meant any validation failure here (e.g. one premium field
  // filled in but not the other) previously showed no visible feedback
  // at all when clicking "See Updated Score".
  let stepEl = CALCULATOR_MODE ? document.getElementById("stepModelUpdate") : document.getElementById("step8");

  stepEl.querySelectorAll(".error-box").forEach(e => e.remove());

  // Sick pay is an employer benefit - only relevant (and required) if the
  // client is currently working. Life/CIC/IP, by contrast, don't depend on
  // working status - a client could hold an old policy regardless.
  if(isWorking() && !document.getElementById("sp1")?.value){
    showStepError(stepEl, "Please select your sick pay");
    return false;
  }

  if(v("ip1") > 0){

    if(!document.getElementById("ipe")?.value){
      showStepError(stepEl, "Please enter the age your income protection ends");
      return false;
    }

    if(!document.getElementById("ipClaim")?.value){
      showStepError(stepEl, "Please select your claim period");
      return false;
    }

    if(!document.getElementById("d1")?.value){
      showStepError(stepEl, "Please select your deferred period");
      return false;
    }

    if(!MODEL_UPDATE && v("ipPremium") <= 0){
      showStepError(stepEl, "Please enter your income protection monthly premium - this can't be £0 if you have a policy in place.");
      return false;
    }
  }

  if(hasProtectionSelected()){

    let selection = document.getElementById("lifeCicSelection")?.value || "";

    if(!selection){
      showStepError(stepEl, "Please answer whether you have any life cover or critical illness cover.");
      return false;
    }

    let needsLife = selection === "life_only" || selection === "both_separate" || selection === "both_combined";
    let needsCI = selection === "ci_only" || selection === "both_separate" || selection === "both_combined";
    let hasIP = v("ip1") > 0 && document.getElementById("ipe")?.value && document.getElementById("ipClaim")?.value && document.getElementById("d1")?.value;

    if(selection === "none" && !hasIP){
      showStepError(stepEl, "You told us you have existing protection - please select Income Protection details, or choose the correct option above for your Life or Critical Illness cover.");
      return false;
    }

    if(needsLife && !(v("l1") > 0 && v("lt1") > 0)){
      showStepError(stepEl, "Please enter your Life Cover amount and years remaining.");
      return false;
    }

    if(needsCI && !(v("c1") > 0 && v("ct1") > 0)){
      showStepError(stepEl, "Please enter your Critical Illness Cover amount and years remaining.");
      return false;
    }

    // Premiums can't genuinely be £0 for cover the client says they hold -
    // same principle as the old step3 check, just relocated here alongside
    // the amount/term fields it actually relates to.
    //
    // Skipped entirely during MODEL_UPDATE - the silent, automatic
    // "Generate Updated Report" flow can legitimately produce a state
    // where one slot's premium is genuinely £0 (e.g. a shared combined
    // premium gets fully cleared once only one half of it is replaced by
    // a real logged outcome - the other half has nowhere to come from).
    // There's no adviser present at that exact moment to go fix a field,
    // so hard-blocking here would just dead-end the whole update with no
    // way forward. The live wizard and the What-If Calculator both still
    // enforce this normally.
    if(!MODEL_UPDATE){

      if(selection === "both_combined"){
        if(v("combinedPremium") <= 0){
          showStepError(stepEl, "Please enter your combined Life and Critical Illness Cover for Mortgage monthly premium - this can't be £0.");
          return false;
        }
      } else {
        if(needsLife && v("lifePremium") <= 0){
          showStepError(stepEl, "Please enter your Life Cover for Mortgage monthly premium - this can't be £0.");
          return false;
        }
        if(needsCI && v("ciPremium") <= 0){
          showStepError(stepEl, "Please enter your Critical Illness Cover for Mortgage monthly premium - this can't be £0.");
          return false;
        }
      }
    }
  }

}


  return true;
}


let CURRENT_STEP = 1;

// ===== MODEL AN UPDATE & CALCULATOR (new) =====
// Two separate modes, both triggered by a one-time localStorage handoff from
// the dashboard (same domain, safe). MODEL_UPDATE is for confirmed policies
// actually taken (logged as outcomes) - it runs completely silently and
// saves a real new submission. CALCULATOR_MODE is for exploring "what if"
// scenarios during a live client conversation - it shows an editable screen
// and NEVER saves anything, purely for seeing how the score would move.
// NOTE: this cross-tab handoff intentionally still uses localStorage, not
// sessionStorage - it's a one-time message FROM the dashboard tab TO a
// freshly-opened widget tab, not the client's own saved progress, so it
// needs to be visible across tabs to work at all.
let MODEL_UPDATE = null;
let CALCULATOR_MODE = null;

// ===== DEMO MODE (new) =====
// URL param only (?demo=true) - no embed-config or company/adviser slug
// changes needed. Branding still resolves normally via loadBrandFromSupabase()
// against a real "demo" adviser row in Supabase; DEMO_MODE only controls
// whether the finished assessment gets saved. Read once at load since it
// depends purely on the URL, not on any async data.
const DEMO_MODE = new URLSearchParams(window.location.search).get("demo") === "true";

function checkForModelUpdate(){
  try {
    let raw = localStorage.getItem("resilienceToolModelUpdate");
    if(raw){
      localStorage.removeItem("resilienceToolModelUpdate");
      MODEL_UPDATE = JSON.parse(raw);
    }
  } catch(err){
    console.error("Could not read Model an Update handoff data:", err);
    MODEL_UPDATE = null;
  }

  try {
    let rawCalc = localStorage.getItem("resilienceToolCalculator");
    if(rawCalc){
      localStorage.removeItem("resilienceToolCalculator");
      CALCULATOR_MODE = JSON.parse(rawCalc);
    }
  } catch(err){
    console.error("Could not read Calculator handoff data:", err);
    CALCULATOR_MODE = null;
  }
}


function showStepError(stepEl, message){

  let box = document.createElement("div");
  box.className = "box error-box";
  box.style.border = "2px solid #e67e22";
  box.style.background = "#fff8f2";
  box.style.marginTop = "15px";

  box.innerHTML = `<b>${message}</b>`;

  let card = stepEl.querySelector(".card");
  card.appendChild(box);

  box.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

function scrollToTopExact(){

  setTimeout(() => {

    let target = document.getElementById("scrollAnchor");

    if(CURRENT_STEP === 1){
      target = BRAND.logoUrl
        ? document.getElementById("companyLogo")
        : document.getElementById("introText");
    }

    if(target){
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

  }, 50);

}

// Shared pre-fill logic used by both Model an Update and the Calculator -
// fills every field from the handoff data, re-runs the normal visibility
// toggles, and recomputes the expense total. Does NOT touch the screen/step
// display - each mode decides what to show separately.
function prefillFormFromData(data){
  const scalarFields = ["clientName","clientEmail","a1","r1","g1","n1","s1","m","mt","l1","lt1","c1","ct1","ip1","ipe","ipClaim","d1","sp1","lifePremium","ciPremium","combinedPremium","ipPremium"];
  scalarFields.forEach(id => {
    let el = document.getElementById(id);
    if(el && data[id] !== undefined && data[id] !== null){
      el.value = data[id];
    }
  });

  if(document.getElementById("isWorking")) document.getElementById("isWorking").value = data.isWorking ? "yes" : "no";
  if(document.getElementById("hasMortgage")) document.getElementById("hasMortgage").value = data.hasMortgage ? "yes" : "no";
  if(document.getElementById("dep")) document.getElementById("dep").value = data.hasDep ? "yes" : "no";
  if(document.getElementById("hasProtection")) document.getElementById("hasProtection").value = data.hasProtection ? "yes" : "no";

  if(document.getElementById("lifeCicSelection")){
    let selection = data.lifeCicSelection;
    if(!selection){
      // Fallback for data saved before this field existed - infers a
      // reasonable equivalent from the old amount fields and toggle value.
      let hasLife = (parseFloat(data.l1) || 0) > 0;
      let hasCI = (parseFloat(data.c1) || 0) > 0;
      if(hasLife && hasCI){
        selection = data.lifeCicPremiumType === "combined" ? "both_combined" : "both_separate";
      } else if(hasLife){
        selection = "life_only";
      } else if(hasCI){
        selection = "ci_only";
      } else {
        selection = "none";
      }
    }
    document.getElementById("lifeCicSelection").value = selection;
  }

  const expEls = document.querySelectorAll(".exp");
  (data.expenseBreakdown || []).forEach(item => {
    let expEl = expEls[item.index];
    if(!expEl) return;
    let amt = expEl.querySelector(".amt");
    if(amt) amt.value = item.amount || "";
    let toggles = expEl.querySelectorAll(".toggle span");
    toggles.forEach(btn => {
      btn.classList.remove("on");
      if(btn.innerText === item.toggle) btn.classList.add("on");
    });
    let slider = expEl.querySelector('input[type="range"]');
    if(slider) slider.value = item.slider;
    if(item.toggle === "Flexible"){
      let sliderWrap = expEl.querySelector(".flex-slider");
      if(sliderWrap) sliderWrap.style.display = "block";
      updateFlexSliderDisplay(expEl);
    }
  });

  toggleChildcare();
  toggleLifeCover();
  toggleIncomeFields();
  toggleProtectionFields();
  updateLifeCicFieldsFromSelection();
  toggleSickPay();

  plannerData.step3 = getStepData(3);
  plannerData.step4 = getStepData(4);
  plannerData.step5 = getStepData(5);
  plannerData.step6 = getStepData(6);
  calcBudget();
}

function hideNormalWizard(){
  const progressBar = document.getElementById("progressBar");
  if(progressBar) progressBar.style.display = "none";
  const introText = document.getElementById("introText");
  if(introText) introText.style.display = "none";

  document.querySelectorAll(".step").forEach(s => {
    s.style.display = "none";
    s.classList.remove("active");
  });
}

// Clones an expense-planner "exp" field (amount + Essential/Flexible/
// Non-essential toggle + flex-slider) into a container while leaving the
// original in place, and wires up two-way sync so edits made in the clone
// are mirrored onto the original - which is what getStepData(), calcBudget()
// and saveProgress() actually read. Cloning (rather than appendChild-moving
// the real node) is essential here: appendChild() on a node that already
// exists in the DOM MOVES it rather than copying it, which previously
// relocated the premiums field permanently out of the Housing section for
// the rest of the browser tab's life, shifting every later expense's
// DOM-order index and corrupting the shared exp_N localStorage save data -
// including for fresh assessments started afterward in the same session.
function cloneExpenseFieldForCalculator(original, container){
  if(!original || !container) return;

  let clone = original.cloneNode(true);
  clone.removeAttribute("id");
  container.appendChild(clone);

  let cloneAmt = clone.querySelector(".amt");
  let originalAmt = original.querySelector(".amt");
  if(cloneAmt && originalAmt){
    cloneAmt.addEventListener("input", () => {
      originalAmt.value = cloneAmt.value;
      originalAmt.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }

  clone.querySelectorAll(".toggle span").forEach(cloneBtn => {
    cloneBtn.addEventListener("click", () => {
      let label = cloneBtn.innerText;
      original.querySelectorAll(".toggle span").forEach(origBtn => {
        origBtn.classList.remove("on");
        if(origBtn.innerText === label) origBtn.classList.add("on");
      });
      original.dispatchEvent(new Event("input", { bubbles: true }));
    });
  });

  let cloneSlider = clone.querySelector('input[type="range"]');
  let originalSlider = original.querySelector('input[type="range"]');
  if(cloneSlider && originalSlider){
    cloneSlider.addEventListener("input", () => {
      originalSlider.value = cloneSlider.value;
      originalSlider.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }
}

// Clones a simple protection field block (Life Cover / CIC / IP - plain
// input/select pairs, not expense-planner "exp" items) into a container
// while leaving the original Step 8 fields in place, syncing edits back to
// the originals by DOM position. IDs are stripped from the clone (including
// nested ones like #deferredBanner) to avoid duplicate-id collisions with
// the real, hidden Step 8 fields that calculations still read from.
function cloneProtectionFieldForCalculator(original, container){
  if(!original || !container) return;

  let clone = original.cloneNode(true);
  clone.removeAttribute("id");
  clone.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));
  container.appendChild(clone);

  let cloneFields = clone.querySelectorAll("input, select");
  let originalFields = original.querySelectorAll("input, select");

  cloneFields.forEach((cloneField, i) => {
    let originalField = originalFields[i];
    if(!originalField) return;
    cloneField.value = originalField.value;
    let syncBack = () => {
      originalField.value = cloneField.value;
      originalField.dispatchEvent(new Event("input", { bubbles: true }));
    };
    cloneField.addEventListener("input", syncBack);
    cloneField.addEventListener("change", syncBack);
  });
}

// ===== CALCULATOR MODE - editable, explore freely, never saves =====
function enterCalculatorMode(){
  const data = CALCULATOR_MODE.rawInputs || {};
  prefillFormFromData(data);

  // Calculator mode always explores with BOTH Life and CIC visible, in
  // separate-premium mode - regardless of what the client's original
  // selection actually was. This lets an adviser explore adding a type of
  // cover the client didn't originally have, and sidesteps needing a
  // dynamic combined/separate toggle inside a static field clone (which
  // previously caused both the Combined field and the separate fields to
  // show at once, with an inert dropdown). The reference box above already
  // shows the client's real original figures for context.
  if(document.getElementById("lifeCicSelection")){
    document.getElementById("lifeCicSelection").value = "both_separate";
  }
  updateLifeCicFieldsFromSelection();

  const container = document.getElementById("modelUpdateFields");

  // Reference summary of the client's CURRENT details, shown once at the
  // top before any editable fields - lets the adviser see what's actually
  // in place right now without flicking back to the dashboard or the
  // client's original submission. Built directly from `data` (the same
  // raw inputs already available here), so it doesn't need to touch the
  // generic field-cloning logic below at all.
  let referenceLines = [];

  if(data.hasMortgage && num(data.m) > 0){
    referenceLines.push(`Mortgage Balance: £${fmt(num(data.m))} over ${data.mt || 0} years`);
  }

  if(num(data.l1) > 0){
    referenceLines.push(`Life Cover: £${fmt(num(data.l1))} over ${data.lt1 || 0} years`);
  }

  if(num(data.c1) > 0){
    referenceLines.push(`Critical Illness Cover: £${fmt(num(data.c1))} over ${data.ct1 || 0} years`);
  }

  if(num(data.ip1) > 0){
    let claimLabel = data.ipClaim === "Full-term" ? "Full-term" : `${data.ipClaim} Year${data.ipClaim === "1" ? "" : "s"}`;
    referenceLines.push(`Income Protection: £${fmt(num(data.ip1))}/month to age ${data.ipe || "-"}, ${claimLabel} claim, ${data.d1 || 0} week deferred period`);
  }

  if(num(data.sp1) > 0){
    referenceLines.push(`Sick Pay: ${data.sp1} weeks`);
  }

  // Premium reference - one line per policy, respecting the client's
  // actual selection exactly as the live form does, plus a bold total at
  // the end as a quick at-a-glance figure for the adviser.
  let hasLifeCover = num(data.l1) > 0;
  let hasCICover = num(data.c1) > 0;
  let referenceSelection = data.lifeCicSelection || (data.lifeCicPremiumType === "combined" ? "both_combined" : "");
  let isCombinedPremium = referenceSelection === "both_combined";

  let totalPremium = 0;

  if(isCombinedPremium){
    let combinedPrem = num(data.combinedPremium);
    referenceLines.push(`Combined Life and Critical Illness Cover for Mortgage Premium: £${fmt(combinedPrem)}/month`);
    totalPremium += combinedPrem;
  } else {
    if(hasLifeCover){
      let lifePrem = num(data.lifePremium);
      referenceLines.push(`Life Cover for Mortgage Premium: £${fmt(lifePrem)}/month`);
      totalPremium += lifePrem;
    }
    if(hasCICover){
      let ciPrem = num(data.ciPremium);
      referenceLines.push(`Critical Illness Cover for Mortgage Premium: £${fmt(ciPrem)}/month`);
      totalPremium += ciPrem;
    }
  }

  if(num(data.ip1) > 0){
    let ipPrem = num(data.ipPremium);
    referenceLines.push(`Income Protection Premium: £${fmt(ipPrem)}/month`);
    totalPremium += ipPrem;
  }

  if(totalPremium > 0){
    referenceLines.push(`<b>Total Current Premium: £${fmt(totalPremium)}/month</b>`);
  }

  if(referenceLines.length){
    container.innerHTML = `
      <div class="box" style="background:#eef3ff;border:1px solid var(--primary-colour);margin-bottom:16px;">
        <b style="color:var(--primary-colour);">Current Details (for reference)</b>
        <div style="margin-top:8px;font-size:14px;line-height:1.6;">
          ${referenceLines.join("<br>")}
        </div>
      </div>
      <div class="box" style="background:#fff6e5;border:1px solid #e67e22;margin-bottom:16px;font-size:13px;">
        ⚠️ When editing premiums below, enter the total the client will actually be paying for each type of cover - including anything being replaced, not just what's new - so the score reflects their real ongoing spending. If their cover above is one combined policy, split the combined premium across the Life and Critical Illness fields below in whatever way reflects your best estimate.
      </div>
    `;
  }

  // ipFields depends only on hasProtection, not this selection - forced
  // visible here so a client with no cover today can still explore "what
  // if I took out income protection?"
  let ipFieldsEl = document.getElementById("ipFields");
  if(ipFieldsEl) ipFieldsEl.style.display = "block";

  const protectionCard = document.getElementById("step8")?.querySelector(".card");
  if(protectionCard){
    Array.from(protectionCard.children).forEach(child => {
      if(child.id === "sickPayBlock" || child.id === "lifeCicSelectionBlock") return;
      cloneProtectionFieldForCalculator(child, container);
    });
  }

  hideNormalWizard();

  let muStep = document.getElementById("stepModelUpdate");
  if(muStep){
    muStep.style.display = "block";
    void muStep.offsetHeight;
    muStep.classList.add("active");
  }

  let heading = document.getElementById("modelUpdateHeading");
  if(heading) heading.innerText = "What-If Calculator";

  let intro = document.getElementById("modelUpdateIntro");
  if(intro) intro.innerHTML = `Exploring different scenarios for <b id="modelUpdateClientName">this client</b>. Nothing here is saved - adjust the figures below and see how the score would change.`;

  let nameLabel = document.getElementById("modelUpdateClientName");
  if(nameLabel) nameLabel.innerText = data.clientName || "this client";

  let recalcBtn = document.getElementById("modelUpdateRecalcBtn");
  if(recalcBtn){
    recalcBtn.textContent = "See Updated Score";
    recalcBtn.addEventListener("click", recalculateCalculator);
  }
}

function recalculateCalculator(){
  if(!validateStep(8)){
    return;
  }
  let analysis = generateAnalysis();
  renderResults(analysis, { showTryAgainButton: true });
  // Deliberately never calls saveSubmission() - this is exploration only
}

function backToCalculator(){
  hideNormalWizard();
  let muStep = document.getElementById("stepModelUpdate");
  if(muStep){
    muStep.style.display = "block";
    void muStep.offsetHeight;
    muStep.classList.add("active");
  }
}

// ===== MODEL AN UPDATE - silent, automatic, saves a real submission =====
async function enterSilentModelUpdateMode(){
  const data = MODEL_UPDATE.rawInputs || {};
  prefillFormFromData(data);

  hideNormalWizard();

  let autoStep = document.getElementById("stepAutoUpdate");
  if(autoStep){
    autoStep.style.display = "block";
    void autoStep.offsetHeight;
    autoStep.classList.add("active");
  }

  let nameLabel = document.getElementById("autoUpdateClientName");
  if(nameLabel) nameLabel.innerText = data.clientName || "this client";

  // Brief pause purely so the adviser has time to read what's happening
  // rather than seeing an instant flash - the calculation itself is fast
  await new Promise(resolve => setTimeout(resolve, 2200));

  if(!validateStep(8)){
    let statusEl = document.getElementById("autoUpdateStatus");
    if(statusEl){
      statusEl.innerHTML = `<b style="color:#b00020;">Could not automatically update this client's score - some required details are missing from their original assessment. Please check their submission and try Model an Update again, or contact support.</b>`;
    }
    return;
  }

  let analysis = generateAnalysis();
  renderResults(analysis);

  let statusEl = document.getElementById("autoUpdateStatus");

  if(analysis.status === "ok"){
    try {
      await saveSubmission(analysis);
      if(statusEl){
        statusEl.innerHTML = `<b style="color:#1e8449;">✓ Done - updated score saved.</b>`;
      }
    } catch(saveErr){
      if(statusEl){
        statusEl.innerHTML = `<b style="color:#b00020;">The updated score was calculated correctly, but could not be saved - ${saveErr.message}. Please try again, or contact support.</b>`;
      }
      return;
    }
  } else {
    // The report on screen is real and correctly reflects everything
    // logged — but it was NOT saved, since generateAnalysis() didn't
    // return a genuine, complete result. Previously this showed the same
    // "Done" message regardless, silently misleading the adviser into
    // thinking an update had been saved when it hadn't been.
    if(statusEl){
      statusEl.innerHTML = `<b style="color:#b00020;">Could not save this update - the client's original data appears incomplete (${analysis.status}). Please check their submission directly, or contact support.</b>`;
    }
    return;
  }

  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    window.close();
  } catch(err){
    console.warn("Could not auto-close tab:", err);
  }
}

function backFromProtection(){

  if(document.getElementById("hasMortgage")?.value === "no"){
    goToStep(6);
  } else {
    goToStep(7);
  }

}

function bookConsultation(){
  if(BRAND.bookingUrl && BRAND.bookingUrl !== "#"){
    window.open(BRAND.bookingUrl, "_blank");
  } else if(BRAND.adviserPhone){
    window.location.href = `tel:${BRAND.adviserPhone.replace(/\s+/g,"")}`;
  } else {
    alert(`Please contact ${BRAND.companyName} to book a consultation.`);
  }
}

function goToStep(step){

  try {

    document.querySelectorAll(".error-box").forEach(e => e.remove());

    if(DEMO_MODE && step !== "resultsPage"){
      hideDemoConversionBannerEl();
    }

    // The 8→'6a' transition passes the string "6a" as its target (not a
    // number), so it was silently bypassing this guard entirely - every
    // other Next button passes a number and validated correctly, which is
    // exactly why Existing Protection was the one step where validateStep()
    // never actually ran no matter what its internal logic checked for.
    let isForwardStep = typeof step === "number" && step > CURRENT_STEP;
    let isProtectionToAvailableIncome = step === "6a" && CURRENT_STEP === 8;

    if(isForwardStep || isProtectionToAvailableIncome){
      if(!validateStep(CURRENT_STEP)){
        return;
      }
    }
   
    let introText = document.getElementById("introText");
    if(introText){
      introText.style.display = (step === 1) ? "block" : "none";
    }

    if(step === "6a"){
      calcBudget();
      let available = v("n1") - v("e1");
      let display = document.getElementById("availableIncomeDisplay");
      if(display){
        display.innerText = available.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
      }
    }

    if(step === 7 && document.getElementById("hasMortgage")?.value === "no"){
      step = 8;
    }

    CURRENT_STEP = step;

    let active = (step === "resultsPage")
      ? document.getElementById("resultsPage")
      : document.getElementById("step" + step);

    if(!active){
      console.error("Step not found:", step);
      return;
    }

    document.querySelectorAll(".step").forEach(s => {
      s.style.display = "none";
      s.classList.remove("active");
    });

    active.style.display = "block";

    void active.offsetHeight;

    active.classList.add("active");

    updateProgress(step);

    scrollToTopExact();

  } catch(err){
    console.error("STEP ERROR:", err);
  }
}

function updateProgress(step){

  let bar = document.getElementById("progressBar");
  let status = document.getElementById("saveStatus");
  let tabNotice = document.getElementById("tabOnlyNotice");

  if(!bar) return;

  if(step === "resultsPage"){

    bar.style.display = "none";

    if(status){
      status.style.display = "none";
    }

    if(tabNotice){
      tabNotice.style.display = "none";
    }

    return;

  } else {

    bar.style.display = "block";

    if(status){
      status.style.display = "block";
    }

    if(tabNotice){
      tabNotice.style.display = "block";
    }

  }

  let displayStep = getDisplayStep(step);

  const stepLabels = {
    1: "About You",
    2: "Income & Savings",
    3: "Spending",
    4: "Mortgage",
    5: "Protection"
  };

  let progressText = bar.querySelector(".progress-text");

  if(progressText){
    progressText.innerText =
      `Step ${displayStep} of 5 • ${stepLabels[displayStep]}`;
  }

  let dots = bar.querySelectorAll(".dot");

  dots.forEach((d,i)=>{
    d.classList.remove("active");

    if(i < displayStep){
      d.classList.add("active");
    }
  });
}

function updateDeferredBanner(){

  let raw = document.getElementById("sp1")?.value;
  let dpRaw = document.getElementById("d1")?.value;
  let dp = parseInt(dpRaw || 0);
  let sp = parseInt(raw || 0);

  let container = document.getElementById("deferredBanner");

  if(!container) return;

  let ip = v("ip1");

  if(ip <= 0){
    container.innerHTML = "";
    return;
  }

  // Both Deferred Period AND Sick Pay need a real selection before this
  // banner evaluates anything - previously only Sick Pay was checked, so
  // selecting Sick Pay before touching Deferred Period could wrongly show
  // the green "tip" message (since an unset Deferred Period parsed as 0,
  // making any non-zero Sick Pay look like it "lasts longer").
  if(raw === "" || dpRaw === ""){
    container.innerHTML = "";
    return;
  }

  if(dp > sp){

    container.innerHTML = `
      <div style="margin-top:10px;padding:12px;border-radius:8px;background:#fdecea;color:#b00020;">
        ⚠️ Your sick pay ends <b>${dp - sp} weeks</b> before your income protection begins.
        You would need to rely on your savings during this period, and if they are insufficient, you could face financial pressure before your policy begins to pay.
      </div>
    `;

  }
  else if(sp > dp){

    container.innerHTML = `
      <div style="margin-top:10px;padding:12px;border-radius:8px;background:#eefaf1;color:#1e8449;">
        💡 Your sick pay lasts <b>${sp - dp} weeks longer</b> than your deferred period.
        You may be able to extend your deferred period and reduce your premium.
      </div>
    `;

  }
  else{

    container.innerHTML = "";

  }

}

/* Recalculates the "Keep £X (Y%)" caption under a Flexible expense's slider.
   Called both when the slider itself moves AND when the base amount field
   changes, so the caption never goes stale against an old base amount. */
function updateFlexSliderDisplay(exp){
  let slider = exp.querySelector('input[type="range"]');
  let small = exp.querySelector(".small");
  if(!slider || !small) return;

  let val = 0;
  exp.querySelectorAll(".amt").forEach(input => {
    let cleaned = clean(input.value);
    val += num(cleaned);
  });

  let pct = slider.value;

  small.innerText =
    "Keep £" +
    (val * pct / 100).toFixed(0) +
    " (" + pct + "%)";
}


document.addEventListener("click", function(e){

  let btn = e.target.closest(".toggle span");
  if(!btn) return;

  let exp = btn.closest(".exp");
  if(!exp) return;

  let toggles = exp.querySelectorAll(".toggle span");
  if(toggles.length === 0) return;

  toggles.forEach(s => s.classList.remove("on"));
  btn.classList.add("on");

  let slider = exp.querySelector(".flex-slider");

  if(slider){

    if(btn.innerText === "Flexible"){

      slider.style.display = "block";

      setTimeout(() => {

        if(window.innerWidth <= 768){
          exp.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }

        updateFlexSliderDisplay(exp);

      }, 50);

    } else {

      slider.style.display = "none";

    }
  }

  try{
    calcBudget();
  }
  catch(e){
    console.warn("calc skipped", e);
  }

});


document.addEventListener("input", function(e){

  if(e.target.type === "range"){

    let exp = e.target.closest(".exp");
    if(exp) updateFlexSliderDisplay(exp);

  }

  if(e.target.classList && e.target.classList.contains("amt")){

    let exp = e.target.closest(".exp");
    if(exp) updateFlexSliderDisplay(exp);

  }

  let stepEl = e.target.closest(".step");

  if(stepEl){

    let step = stepEl.id.replace("step","");

    if(step >= 3 && step <= 6){
      plannerData["step" + step] = getStepData(step);
    }

  }

  try{
    calcBudget();
  }
  catch(err){
    console.error(err);
  }

  saveProgress();
  updateDeferredBanner();

});

function animateRiskScore(){

  let el = document.getElementById("animatedScore");
  if(!el) return;

  let target = parseInt(el.getAttribute("data-target")) || 0;
  let current = 0;

  let duration = 1200;
  let steps = 30;
  let increment = target / steps;

  let interval = setInterval(() => {

    current += increment;

    if(current >= target){
      current = target;
      clearInterval(interval);
    }

    el.innerText = Math.round(current);

  }, duration / steps);

}

// Sums whichever premium fields are currently relevant, based on the
// explicit "Which type of protection do you have?" selection - never
// inferred from amounts, so a combined policy's premium is never
// double-counted against separate Life+CIC fields that are hidden anyway.
function getTotalProtectionPremiums(){

  let selection = document.getElementById("lifeCicSelection")?.value || "";

  let total = 0;

  if(selection === "both_combined"){
    total += v("combinedPremium");
  } else {
    total += v("lifePremium");
    total += v("ciPremium");
  }

  total += v("ipPremium");

  return total;
}

function calcBudget(){

  let total = 0;
  let reduced = 0;


Object.values(plannerData).forEach(stepArray => {

  if(!Array.isArray(stepArray)) return;

  stepArray.forEach(item => {
    if(!item) return;

    total += item.value || 0;

    if(item.type === "Essential"){
      reduced += item.value || 0;
    }

    if(item.type === "Flexible"){
      reduced += (item.value || 0) * ((item.pct || 0) / 100);
    }

  });

});

  // Protection premiums are always treated as essential, non-negotiable
  // spending - they don't run through the Essential/Flexible/Non-essential
  // toggle system the way discretionary expenses do, since cancelling
  // mortgage protection isn't a realistic "cutback" in the same sense as
  // skipping a subscription.
  total += getTotalProtectionPremiums();

  document.getElementById("e1").value = total;
}


function v(id){
  let el = document.getElementById(id);
  if(!el || el.value === "") return 0;

  return num(el.value);
}
function hasMortgage(){
  return document.getElementById("hasMortgage")?.value === "yes";
}

function isWorking(){
  return document.getElementById("isWorking")?.value === "yes";
}

function hasDep(){
  return document.getElementById("dep")?.value === "yes";
}

function hasProtectionSelected(){
  return document.getElementById("hasProtection")?.value === "yes";
}
  
function getExpenseBreakdown(){
  let breakdown = [];
  document.querySelectorAll(".exp").forEach((exp, index) => {
    let amountInput = exp.querySelector(".amt");
    if(!amountInput) return;
    let active = exp.querySelector(".toggle .on");
    let slider = exp.querySelector('input[type="range"]');
    breakdown.push({
      index: index,
      id: exp.id || null,
      label: exp.querySelector("label")?.innerText || "",
      amount: amountInput.value || "",
      toggle: active ? active.innerText : "Essential",
      slider: slider ? slider.value : 50
    });
  });
  return breakdown;
}

function getFormData(){
  return {
    clientName: document.getElementById("clientName")?.value || "",
    clientEmail: document.getElementById("clientEmail")?.value || "",
    a1: v("a1"),
    r1: v("r1"),
    isWorking: isWorking(),
    hasMortgage: hasMortgage(),
    hasDep: hasDep(),
    hasProtection: hasProtectionSelected(),

    g1: v("g1"),
    n1: v("n1"),
    s1: v("s1"),

    m: v("m"),
    mt: v("mt"),

    l1: v("l1"),
    lt1: v("lt1"),
    c1: v("c1"),
    ct1: v("ct1"),

    lifePremium: v("lifePremium"),
    ciPremium: v("ciPremium"),
    combinedPremium: v("combinedPremium"),
    lifeCicSelection: document.getElementById("lifeCicSelection")?.value || "",

    ip1: v("ip1"),
    ipe: v("ipe"),
    ipClaim: document.getElementById("ipClaim")?.value || "",
    d1: v("d1"),
    sp1: v("sp1"),
    ipPremium: v("ipPremium"),

    e1: v("e1"),

    // Full expense line-by-line breakdown - needed so a future "Model an
    // Update" can fully pre-fill the planner, not just the top-level totals
    expenseBreakdown: getExpenseBreakdown()
  };
}
function fmt(n){
return n.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2});
}

function formatMonths(val){
  if(val < 1){
    return val.toFixed(2);
  }
  return val.toFixed(1);
}

function pct(a,b){return b?(a/b)*100:0;}

function strength(p){
  if(p >= 90) return {txt:"Strong", cls:"green"};
  if(p >= 50) return {txt:"Moderate", cls:"orange"};
  return {txt:"Weak", cls:"red"};
}

function lifeDot(c,m){
let p=m>0?c/m:0;
return p>=1?"green":p>=0.5?"orange":"red";
}

function termShort(t,mt){return Math.max(mt-t,0);}
function termDot(v){return v>0?"red":"green";}

function ipCalc(b,g,a,r,ipe){

let maxAnnual=g<=60000?g*0.65:(60000*0.65+(g-60000)*0.45);
let max=Math.min(maxAnnual/12,20000);

let monthlyGap=Math.max(max-b,0);

let endAge = ipe>0 ? Math.min(ipe,r) : r;

let yearsCovered=Math.max(endAge-a,0);
let yearsAfter=Math.max(r-endAge,0);

let sickYears=v("sp1")/52;
let savingsYears = (v("n1") > 0 ? v("s1") / v("n1") : 0) / 12;

let adjustedAfter=Math.max(yearsAfter-sickYears-savingsYears,0);

let total = (monthlyGap*12*yearsCovered) + (max*12*adjustedAfter);

return{
max,
monthly:monthlyGap,
annual:monthlyGap*12,
total:total
};
}

function ipDot(val,max){
let p=max>0?val/max:0;
if(p<=0.25)return"green";
if(p<=0.6)return"orange";
return"red";
}


function efDot(m){
  if(m >= 6) return "green";
  if(m >= 3) return "orange";
  return "red";
}


// riskScore() - lifeCoverRatioOverride and ciCoverRatioOverride are optional.
// When omitted, behaviour is unchanged (reads the real l1/c1 form fields).
// When supplied (e.g. 1, meaning "fully covered"), they let originalCalc()
// ask "what would the score be if this specific cover were fully aligned?"
// without the safety-net caps silently re-reading the real, unedited field
// and capping the hypothetical result back down.
function riskScore(ipScore, efMonths, lifeScore, ciScore, lifeCoverRatioOverride, ciCoverRatioOverride){

  let hasMortgage = document.getElementById("hasMortgage")?.value !== "no";
  let hasDep = document.getElementById("dep")?.value === "yes";

  let isWorking = document.getElementById("isWorking")?.value === "yes";
  let noIncome = !isWorking;

  let ipMaxCalc = ipCalc(v("ip1"), v("g1"), v("a1"), v("r1"), v("ipe"));
  let isMaxedOut = v("ip1") >= (ipMaxCalc.max * 0.9);

  let coversExpenses = v("ip1") >= v("e1");
  let ipFinal = Math.min(ipScore, 100);

  let dp = v("d1");
  let sp = v("sp1");

  let claimPeriod = v("ip1") > 0
    ? document.getElementById("ipClaim")?.value
    : "";

  if(dp > sp){

    let gapWeeks = dp - sp;
    let gapMonths = gapWeeks / 4.33;

    let adjustedSpending = v("e1");
    let savingsMonths = v("s1") / (adjustedSpending || 1);

    let hasDependents = hasDep;

    if(gapMonths >= 2.5){

      if(savingsMonths < gapMonths){
        ipFinal *= hasDependents ? 0.92 : 0.88;
      }
      else if(savingsMonths < (gapMonths * 1.5)){
        ipFinal *= hasDependents ? 0.96 : 0.93;
      }

    }
  }

  if(v("ip1") < (v("e1") * 0.5)){
    ipFinal *= 0.5;
  }
  
if(!noIncome){

  if(coversExpenses){

    if(ipScore < 90) ipFinal *= 0.9;
    if(ipScore < 75) ipFinal *= 0.85;

    if(v("ip1") < (ipMaxCalc.max * 0.9)){
      ipFinal *= 0.9;
    }

  } else {

    if(hasMortgage){

      if(ipScore < 80) ipFinal *= 0.65;
      if(ipScore < 60) ipFinal *= 0.5;

    }

  }
}

  if(ipFinal >= 99){
    ipFinal = 100;
  } else {
    let ipPenalty = 0.65 + (0.35 * (ipFinal / 100));
    ipFinal *= ipPenalty;
  }

  let ipTermGapYears = Math.max(v("r1") - (v("ipe") || v("r1")), 0);

  if(!noIncome && ipTermGapYears > 0){

    if(ipTermGapYears >= 10){
      ipFinal *= 0.6;
    }
    else if(ipTermGapYears >= 5){
      ipFinal *= 0.75;
    }
    else{
      ipFinal *= 0.9;
    }
  }

  // Claim period is now handled as a flat deduction further down, not a
  // percentage multiplier here - see "flat claim-period deduction" below.

  function applyStructuralPenalty(score){
    if(score === 100) return score;
    let penalty = 0.65 + (0.35 * (score / 100));
    return score * penalty;
  }

  let lifeFinal = applyStructuralPenalty(lifeScore);
  let ciFinal = applyStructuralPenalty(ciScore);

  let lifestyleMonths = v("s1") / (v("e1") || 1);
  let reducedMonths = efMonths;

  let efScore;

  if(lifestyleMonths >= 6){
    efScore = 100;
  }
  else if(reducedMonths >= 6){
    efScore = 80;
  }
  else if(reducedMonths >= 3){
    efScore = 60;
  }
  else if(reducedMonths >= 1){
    efScore = 30;
  }
  else{
    efScore = 10;
  }

  let components = [];

  if(!noIncome){
    components.push({
      value: ipFinal,
      weight: hasMortgage ? 0.6 : 0.7
    });
  }

  if(hasMortgage){

    if(hasDep){
      components.push({
        value: lifeFinal,
        weight: noIncome ? 0.5 : 0.2
      });

      components.push({
        value: ciFinal,
        weight: noIncome ? 0.2 : 0.15
      });

    } else {

      components.push({
        value: ciFinal,
        weight: noIncome ? 0.5 : 0.35
      });

    }
  }

  components.push({
    value: efScore,
    weight: noIncome ? 0.3 : (hasMortgage ? 0.05 : 0.3)
  });

  let totalWeight = components.reduce((sum,c) => sum + c.weight, 0);

  let score = components.reduce(
    (sum,c) => sum + (c.value * (c.weight / totalWeight)),
    0
  );
  
let finalScore = score;

let coverageRatio =
  v("e1") > 0
    ? v("ip1") / v("e1")
    : 1;

if(!noIncome && coverageRatio < 1 && !isMaxedOut){

  let ipCap;

  if(coverageRatio >= 0.9){
    ipCap = 80;
  }
  else if(coverageRatio >= 0.75){
    ipCap = 70;
  }
  else if(coverageRatio >= 0.5){
    ipCap = 60;
  }
  else{
    ipCap = 50;
  }

  // Soft cap, not a flat clamp - the raw score can genuinely improve
  // through stronger Life/CIC/Emergency Fund cover, and that improvement
  // should still be visible even while an inadequate IP position keeps the
  // overall score well below what a fully-resolved one would show. Any
  // raw score above the ceiling compresses into a small amount of extra
  // headroom (30% of the excess) rather than being discarded outright -
  // previously, two clients with identical IP shortfalls but very
  // different Life/CIC adequacy would show an identical score.
  if(finalScore > ipCap){
    let excess = finalScore - ipCap;
    finalScore = ipCap + (excess * 0.3);
  }
}

// Structural shortfall - even the maximum available income protection
// benefit (insurer-capped, based on income) wouldn't cover expenses. This
// gap can't be closed by increasing cover further, since the client has
// already reached the ceiling insurers allow, so the score should reflect
// the residual, unmitigated risk rather than register as fully resolved
// just because they've maxed out what's available to them.
let maxCoverageRatio = v("e1") > 0 ? ipMaxCalc.max / v("e1") : 1;
if(!noIncome && isMaxedOut && maxCoverageRatio < 1){

  let structuralCap;

  if(maxCoverageRatio >= 0.9){
    structuralCap = 90;
  }
  else if(maxCoverageRatio >= 0.75){
    structuralCap = 80;
  }
  else if(maxCoverageRatio >= 0.5){
    structuralCap = 70;
  }
  else{
    structuralCap = 60;
  }

  // Same soft-cap treatment as above, for the same reason.
  if(finalScore > structuralCap){
    let excess = finalScore - structuralCap;
    finalScore = structuralCap + (excess * 0.3);
  }
}

let gapWeeks = Math.max(v("d1") - v("sp1"), 0);
let gapMonths = gapWeeks / 4.33;
let savingsMonths = v("s1") / (v("e1") || 1);

if(!noIncome && gapMonths >= 2.5 && savingsMonths < gapMonths){
  finalScore = Math.min(finalScore, 55);
}

// No-income structural cap - with zero income and real ongoing expenses,
// savings are a depleting resource with nothing refilling them. However
// large the buffer, this is a runway, not a resolved position - one day
// it runs out if income stays at zero, so the score should never reach
// "Strong" territory purely on savings size the way a working client's
// Emergency Fund can. Tiered by months of runway (savings ÷ expenses) so
// a larger buffer is still recognised as meaningfully better than a
// smaller one, just never treated as fully safe.
if(noIncome && v("e1") > 0){

  let noIncomeMonthsRunway = v("s1") / v("e1");
  let noIncomeCap;

  if(noIncomeMonthsRunway >= 24){
    noIncomeCap = 55;
  }
  else if(noIncomeMonthsRunway >= 12){
    noIncomeCap = 45;
  }
  else if(noIncomeMonthsRunway >= 6){
    noIncomeCap = 35;
  }
  else if(noIncomeMonthsRunway >= 3){
    noIncomeCap = 25;
  }
  else{
    noIncomeCap = 15;
  }

  finalScore = Math.min(finalScore, noIncomeCap);
}

// Life Cover safety-net - sliding scale rather than a flat cliff, so £1 of
// cover isn't treated wildly differently from £0, and cover scaling up
// toward 30% of the mortgage balance smoothly releases the cap rather than
// jumping straight to the uncapped score at an arbitrary threshold.
// lifeCoverRatioOverride lets a hypothetical "what if fully covered" call
// (see originalCalc()) bypass reading the real, unedited l1/m fields.
let lifeCoverRatio = lifeCoverRatioOverride !== undefined
  ? lifeCoverRatioOverride
  : (v("m") > 0 ? v("l1") / v("m") : 1);
if(hasMortgage && hasDep && lifeCoverRatio < 0.3){
  let slidingCap = 70 + ((lifeCoverRatio / 0.3) * (finalScore - 70));
  finalScore = Math.min(finalScore, slidingCap);
}

// Critical Illness Cover safety-net - CIC is discretionary, not essential in
// the way Life Cover is, so it only meaningfully drags the score down when
// BOTH Income Protection and Life Cover are already weak. The floor scales
// with whichever of those two is doing the better job (protectionAdequacy),
// so a strong IP or strong Life Cover alone is enough to make missing CIC a
// minor issue, while both being weak makes it a real one.
// ciCoverRatioOverride works the same way as lifeCoverRatioOverride above.
let ciCoverRatio = ciCoverRatioOverride !== undefined
  ? ciCoverRatioOverride
  : (v("m") > 0 ? v("c1") / v("m") : 1);
if(hasMortgage && ciCoverRatio < 0.3 && !noIncome){
  let ipExpenseCoverage = Math.min(1, v("e1") > 0 ? v("ip1") / v("e1") : 1);
  let lifeCoverAdequacy = lifeFinal / 100;
  let protectionAdequacy = Math.max(ipExpenseCoverage, lifeCoverAdequacy);
  let cicFloor = 65 + (protectionAdequacy * 17);
  let cicSlidingCap = cicFloor + ((ciCoverRatio / 0.3) * (finalScore - cicFloor));
  finalScore = Math.min(finalScore, cicSlidingCap);
}

if(!noIncome && ipTermGapYears >= 10){
  finalScore = Math.min(finalScore, 60);
}

if(!noIncome && ipTermGapYears >= 15){
  finalScore = Math.min(finalScore, 50);
}

if(!noIncome && claimPeriod === "1"){
  finalScore = Math.min(finalScore, 60);
}
else if(!noIncome && claimPeriod === "2"){
  finalScore = Math.min(finalScore, 68);
}
else if(!noIncome && claimPeriod === "5"){
  finalScore = Math.min(finalScore, 78);
}

// Flat claim-period deduction - guarantees a meaningful, predictable score
// gap between claim-period lengths regardless of how the rest of the
// profile scores, rather than a percentage cut that can get crushed to
// almost nothing by earlier penalties on a weak profile.
if(!noIncome && claimPeriod === "1"){
  finalScore -= 10;
}
else if(!noIncome && claimPeriod === "2"){
  finalScore -= 7;
}
else if(!noIncome && claimPeriod === "5"){
  finalScore -= 4;
}

finalScore = Math.max(0, finalScore);

return Math.round(finalScore);

}

function riskCol(score){

  if(score >= 80){
    return { c: "#1e8449", l: "Strong" };
  }

  if(score >= 45){
    return { c: "#e67e22", l: "Moderate" };
  }

  return { c: "#b00020", l: "Weak" };
}

function getPrimaryDriver(scores){

  let gaps = [];

  // Both checks below are entirely Income Protection-specific - with no
  // employment income, IP is excluded from scoring altogether (see
  // riskScore()'s noIncome branch), so evaluating "does IP cover half of
  // expenses" or "would savings cover the IP waiting period" for a
  // non-working client produces wording like "your income protection
  // wouldn't cover you if your income stopped" for someone with no income
  // to stop in the first place. ip1 is always 0 for a non-working client
  // (correctly cleared), which without this guard made severe_ip fire for
  // essentially every non-working client regardless of their real situation.
  let isWorkingForDriver = document.getElementById("isWorking")?.value === "yes";

  if(isWorkingForDriver){

    if(v("ip1") < (v("e1") * 0.5)){
      return "severe_ip";
    }

    let gapWeeks = Math.max(v("d1") - v("sp1"), 0);
    let gapMonths = gapWeeks / 4.33;

    let savingsMonths =
      v("s1") / (v("e1") || 1);

    if(
      gapMonths >= 2.5 &&
      savingsMonths < gapMonths
    ){
      return "severe_ip";
    }

  }

  if(
    scores.improvedScore >
    scores.currentScore
  ){
    gaps.push({
      type:"ip",
      gain:
        scores.improvedScore -
        scores.currentScore
    });
  }

  if(
    scores.lifeImprovedScore >
    scores.currentScore
  ){
    gaps.push({
      type:"life",
      gain:
        scores.lifeImprovedScore -
        scores.currentScore
    });
  }

  if(
    scores.ciImprovedScore >
    scores.currentScore
  ){
    gaps.push({
      type:"ci",
      gain:
        scores.ciImprovedScore -
        scores.currentScore
    });
  }

  gaps.sort((a,b) => b.gain - a.gain);

  if(gaps.length){
    return gaps[0].type;
  }

  // With no income and real ongoing expenses, riskScore()'s no-income
  // structural cap means the score can never look "resolved" purely from
  // savings size - so this is always the primary driver worth surfacing
  // once no more pressing life/CIC gap exists, regardless of how many
  // months of runway savings currently provide. The raw month-count
  // thresholds below (efMonths<3/<6, same as a working client's
  // ef_weak/ef_moderate) would wrongly suggest 9+ months of runway is
  // "fine" - exactly the disconnect that produced a Weak/35 score
  // alongside wording that read as if everything were basically balanced.
  if(!isWorkingForDriver && v("e1") > 0){
    return "no_income_shortfall";
  }

  let efMonths =
    v("s1") / (v("e1") || 1);

  if(efMonths < 3){
    return "ef_weak";
  }

  if(efMonths < 6){
    return "ef_moderate";
  }

  return "balanced";
}
  
function originalCalc(){

document.getElementById("scoreBox").innerHTML = "";
document.getElementById("out").innerHTML = `
  <div class="box" style="text-align:center;">
    Calculating your results...
  </div>
`;

let isWorking = document.getElementById("isWorking")?.value === "yes";

let incomeLossShort = isWorking
  ? "your income stops"
  : "your financial situation changes";

let m = v("m"), mt = v("mt");
let ip = v("ip1");
let ip1=ipCalc(v("ip1"),v("g1"),v("a1"),v("r1"),v("ipe"));

let improvedIP = ip1.max;
let ipMaxed = v("ip1") >= improvedIP;

let improvedIpScore = 100;

let ipPct = pct(v("ip1"), v("e1"));

let ipTermYears = Math.max((v("ipe") || v("r1")) - v("a1"), 0);

let fullTermYears = Math.max(v("r1") - v("a1"), 0);

let ipTermPct = pct(ipTermYears, fullTermYears);

let ipScore = (ipPct * 0.7) + (ipTermPct * 0.3);

let claimPeriod =
  v("ip1") > 0
    ? document.getElementById("ipClaim")?.value
    : "";

// Claim period is now handled as a single flat deduction inside riskScore()
// rather than a percentage cut here - see the "flat claim-period deduction"
// block near the end of riskScore().

let amountRatioLife = m > 0 ? v("l1") / m : 1;
let termRatioLife   = mt > 0 ? v("lt1") / mt : 1;

amountRatioLife = Math.max(0, Math.min(1, amountRatioLife));
termRatioLife   = Math.max(0, Math.min(1, termRatioLife));

let lifeScore = 100 * Math.min(amountRatioLife, termRatioLife);

let amountPenaltyLife = 0.6 + (0.4 * amountRatioLife);
let termPenaltyLife   = 0.6 + (0.4 * termRatioLife);

lifeScore *= amountPenaltyLife;
lifeScore *= termPenaltyLife;

// Savings can partially replace the mortgage-protection
// function of life cover.

if (
  document.getElementById("hasMortgage")?.value === "yes" &&
  v("l1") === 0
) {

  let mortgageCoverRatio =
    v("s1") / (v("m") || 1);

  if (mortgageCoverRatio >= 1) {

    lifeScore = 80;

  } else if (mortgageCoverRatio >= 0.75) {

    lifeScore = 65;

  } else if (mortgageCoverRatio >= 0.5) {

    lifeScore = 50;

  } else if (mortgageCoverRatio >= 0.25) {

    lifeScore = 30;

  }
}


let amountRatioCI = m > 0 ? v("c1") / m : 1;
let termRatioCI   = mt > 0 ? v("ct1") / mt : 1;

amountRatioCI = Math.max(0, Math.min(1, amountRatioCI));
termRatioCI   = Math.max(0, Math.min(1, termRatioCI));

let ciScore = 100 * Math.min(amountRatioCI, termRatioCI);

let amountPenaltyCI = 0.6 + (0.4 * amountRatioCI);
let termPenaltyCI   = 0.6 + (0.4 * termRatioCI);

ciScore *= amountPenaltyCI;
ciScore *= termPenaltyCI;

// Savings can partially replace the mortgage-protection
// function of critical illness cover.

if (
  document.getElementById("hasMortgage")?.value === "yes" &&
  v("c1") === 0
) {

  let mortgageCoverRatio =
    v("s1") / (v("m") || 1);

  if (mortgageCoverRatio >= 1) {

    ciScore = 80;

  } else if (mortgageCoverRatio >= 0.75) {

    ciScore = 65;

  } else if (mortgageCoverRatio >= 0.5) {

    ciScore = 50;

  } else if (mortgageCoverRatio >= 0.25) {

    ciScore = 30;
}
  }
 
let currentScore = riskScore(
  ipScore,
  (v("n1") > 0 ? v("s1") / v("n1") : 0),
  lifeScore,
  ciScore
);


let originalIP = document.getElementById("ip1")?.value;
let originalIpe = document.getElementById("ipe")?.value;
let originalClaim = document.getElementById("ipClaim")?.value;

if(document.getElementById("ip1")){
  document.getElementById("ip1").value = improvedIP;
}

if(document.getElementById("ipe")){
  document.getElementById("ipe").value = v("r1");
}

if(document.getElementById("ipClaim")){
  document.getElementById("ipClaim").value = "Full-term";
}

let improvedScore = riskScore(
  improvedIpScore,
  (v("n1") > 0 ? v("s1") / v("n1") : 0),
  lifeScore,
  ciScore
);

if(document.getElementById("ip1")){
  document.getElementById("ip1").value = originalIP;
}

if(document.getElementById("ipe")){
  document.getElementById("ipe").value = originalIpe;
}

if(document.getElementById("ipClaim")){
  document.getElementById("ipClaim").value = originalClaim;
}

let improvedLifePct = pct(m, m);
let improvedCiPct = pct(m, m);

// lifeImprovedScore - "what if life cover were fully aligned with the
// mortgage?" Pass lifeCoverRatioOverride = 1 so riskScore()'s Life Cover
// safety-net cap doesn't silently re-read the real (unimproved) l1 field
// and cap this hypothetical score back down to ~70.
let lifeImprovedScore = riskScore(
  ipScore,
  (v("n1") > 0 ? v("s1") / v("n1") : 0),
  100,
  ciScore,
  1
);


// ciImprovedScore - same principle, for critical illness cover.
let ciImprovedScore =
  document.getElementById("hasMortgage")?.value === "yes"
    ? riskScore(
        ipScore,
        (v("n1") > 0 ? v("s1") / v("n1") : 0),
        lifeScore,
        100,
        undefined,
        1
      )
    : currentScore;

let fullImprovedScore = riskScore(
  ipScore,
  (v("n1") > 0 ? v("s1") / v("n1") : 0),
  100,
  100
);



let pMax=pct(v("ip1"),ip1.max);
let pExp=pct(v("ip1"),v("e1"));

let sMax=strength(pMax);
let sExp=strength(pExp);

let lifeShort=Math.max(m-v("l1"),0);
  

let dp = v("d1");
let sp = v("sp1");
let deferText = "";

if(v("ip1") > 0){

  if(dp > sp && v("s1") === 0){

    deferText = `
<b>Your Current Deferred Period:</b><br><br>

Your sick pay ends before your income protection begins, and you do not have savings in place to cover this gap.<br><br>

This means you may need to make immediate cutbacks or rely on other support until payments begin.<br><br>

Income protection is typically paid one month in arrears, which can extend this gap further.
`;

  }

  else if(sp > dp){

    deferText = `
<br>
<b>Your Current Deferred Period:</b><br>
Your sick pay extends beyond your deferred period, which may mean you are paying for cover earlier than needed and could be worth reviewing.
`;

  }

}

let maxBenefitWarning = "";

if(isWorking && ip1.max < v("e1")){

  maxBenefitWarning = `
<div class="text-block" style="margin-top:12px;padding:12px;border-radius:8px;background:#fdecea;color:#b00020;">
  ⚠️ Even at the maximum income protection benefit available to you (£${fmt(ip1.max)} per month), this would not fully cover your current monthly spending of £${fmt(v("e1"))}. Insurers cap the monthly benefit at a percentage of your income, regardless of how much cover you arrange. If a claim were needed, you would likely need to reduce your spending to stay within your benefit amount, or rely on savings to bridge the difference - otherwise you could face financial difficulty even with cover fully in place.
</div>
`;

}

let lifeTerm=termShort(v("lt1"),mt);

let ciShort=Math.max(m-v("c1"),0);
let ciTerm=termShort(v("ct1"),mt);


let adjustedSpending = 0;
  

document.querySelectorAll(".exp").forEach(e => {

  let inputs = e.querySelectorAll(".amt");
  if(inputs.length === 0) return;

  let val = 0;

  inputs.forEach(input => {
    let cleaned = clean(input.value);
    val += num(cleaned);
  });

let type = val === 0
  ? "Non-essential"
  : (e.querySelector(".on")?.innerText || "Non-essential");


  if(type === "Essential"){
    adjustedSpending += val;
  }

  if(type === "Flexible"){
    let r = e.querySelector('input[type="range"]');
    let pct = r ? r.value : 100;
    adjustedSpending += val * (pct / 100);
  }

});

// Protection premiums live in step8 now, not as .exp elements the loop
// above can see - added here as always-essential, matching the same
// treatment they got as a fixed Housing line before this change.
adjustedSpending += getTotalProtectionPremiums();

let trueShortfall = Math.max(adjustedSpending - v("ip1"), 0);

let months = v("s1") / (adjustedSpending || 1);


function monthsDot(m){

  if(m >= 6) return "green";
  if(m >= 3) return "orange";

  let gapWeeks = Math.max(v("d1") - v("sp1"), 0);
  let gapMonths = gapWeeks / 4.33;

  if(v("s1") >= gapMonths * adjustedSpending){
    return "orange";
  }

  return "red";
}

let ipTermGap = Math.max(v("r1") - (v("ipe") || v("r1")), 0);


let ipRec = "";

if(v("ip1") === 0){

  ipRec = `
  <br><br>
  <b>
  Speak to ${BRAND.companyName} about arranging income protection of up to £${fmt(ip1.max)} per month, extending cover to your planned retirement age and selecting a full-term claim period.
  </b>
  `;

}
else{

  let ipImprovements = [];

  if(ip1.monthly > 1){
    ipImprovements.push(
      `increasing your monthly benefit to £${fmt(ip1.max)}`
    );
  }

  if(ipTermGap > 0){
    ipImprovements.push(
      `extending cover to your planned retirement age`
    );
  }

  if(document.getElementById("ipClaim")?.value !== "Full-term"){
    ipImprovements.push(
      `moving to a full-term claim period`
    );
  }

  ipRec =
    ipImprovements.length
    ? `<br><br><b>Speak to ${BRAND.companyName} about ${ipImprovements.join(", ")}.</b>`
    : "";
}


let lifeRec = "";

if(v("l1") === 0){

  lifeRec = `
  <br><br>
  <b>
  Speak to ${BRAND.companyName} about arranging life cover of £${fmt(m)}
  to match your mortgage balance and a term of ${mt} years
  to match your mortgage term.
  </b>
  `;

}
else if(lifeShort > 0 || lifeTerm > 0){

  let actions = [];

  if(lifeShort > 0){
    actions.push(
      `increasing your life cover by £${fmt(lifeShort)}`
    );
  }

  if(lifeTerm > 0){
    actions.push(
      `extending your term by ${lifeTerm} years`
    );
  }

  lifeRec = `
  <br><br>
  <b>
  Speak to ${BRAND.companyName} about ${actions.join(" and ")}.
  </b>
  `;

}
// v("l1")/v("lt1") checked directly rather than lifeShort/lifeTerm - those
// are floored to 0 with Math.max(...,0), so they can't distinguish
// "exactly matches" from "exceeds". Without this branch, an over-insured
// client's Life Cover box showed no recommendation at all - the genuine
// opportunity to right-size cover and reduce the premium was only ever
// mentioned in the Summary's separate over-insurance section, not here.
else if(v("l1") > m || v("lt1") > mt){

  let overParts = [];

  if(v("l1") > m){
    overParts.push(`your cover amount is higher than your mortgage balance`);
  }

  if(v("lt1") > mt){
    overParts.push(`your cover term runs longer than your remaining mortgage term`);
  }

  lifeRec = `
  <br><br>
  <b>
  This is a genuine opportunity to review your cover with ${BRAND.companyName} - ${overParts.join(" and ")}, so right-sizing it could reduce your monthly premium.
  </b>
  `;

}

let ciRec = "";

if(v("c1") === 0){

  ciRec = `
  <br><br>
  <b>
  Speak to ${BRAND.companyName} about arranging critical illness cover of £${fmt(m)}
  to match your mortgage balance and a term of ${mt} years
  to match your mortgage term.
  </b>
  `;

}
else if(ciShort > 0 || ciTerm > 0){

  let actions = [];

  if(ciShort > 0){
    actions.push(
      `increasing your critical illness cover by £${fmt(ciShort)}`
    );
  }

  if(ciTerm > 0){
    actions.push(
      `extending your term by ${ciTerm} years`
    );
  }

  ciRec = `
  <br><br>
  <b>
  Speak to ${BRAND.companyName} about ${actions.join(" and ")}.
  </b>
  `;

}
else if(v("c1") > m || v("ct1") > mt){

  let overParts = [];

  if(v("c1") > m){
    overParts.push(`your cover amount is higher than your mortgage balance`);
  }

  if(v("ct1") > mt){
    overParts.push(`your cover term runs longer than your remaining mortgage term`);
  }

  ciRec = `
  <br><br>
  <b>
  This is a genuine opportunity to review your cover with ${BRAND.companyName} - ${overParts.join(" and ")}, so right-sizing it could reduce your monthly premium.
  </b>
  `;

}

let risk = riskScore(
  ipScore,
  (v("n1") > 0 ? v("s1") / v("n1") : 0),
  lifeScore,
  ciScore
);

let rc = riskCol(risk);


let tone;

let hasMortgage =
  document.getElementById("hasMortgage")?.value === "yes";

if(
  risk >= 80 &&
  lifeShort === 0 &&
  lifeTerm === 0 &&
  ciShort === 0 &&
  ciTerm === 0
){
  tone = "strong";
}

else if(risk >= 55){
  tone = "balanced";
}
else{
  tone = "urgent";
}


let upliftHTML = "";

let disp = v("n1") - adjustedSpending;
let efMonths = v("s1") / (adjustedSpending || 1);

if(!ipMaxed){

upliftHTML = `
<div class="box" style="border:2px solid #1e8449;background:#f4fbf6;">
  <b>A Simple Way to Improve Your Resilience Score</b><br><br>

  Increase your income protection to <b>£${fmt(improvedIP)}</b> per month,
  extend cover to retirement age and move to a full-term claim period.<br><br>

  Your score would improve from <b>${currentScore}</b> to <b>${improvedScore}</b>.
</div>
`;

}

else if(
  document.getElementById("hasMortgage")?.value === "yes" &&
  (ciShort > 0 || ciTerm > 0)
){

  upliftHTML = `
  <div class="box" style="border:2px solid #1e8449;background:#f4fbf6;">
    <b>Next Step to Improve Your Score</b><br><br>
 
    Strengthening your <b>critical illness cover</b> would improve your score 
    from <b>${currentScore}</b> to <b>${ciImprovedScore}</b>.
  </div>
  `;

}

else if(
  document.getElementById("hasMortgage")?.value === "yes" &&
  (lifeShort > 0 || lifeTerm > 0)
){

  upliftHTML = `

  <div class="box" style="border:2px solid #1e8449;background:#f4fbf6;">
    <b>Next Step to Improve Your Score</b><br><br>
 
    Strengthening your <b>life cover</b> would improve your score 
    from <b>${currentScore}</b> to <b>${lifeImprovedScore}</b>.
  </div>
  `;

}

else if(efMonths < 6){

  let efImprovedScore = riskScore(
    ipScore,
    6,
    lifeScore,
    ciScore
  );

  upliftHTML = `
  <div class="box" style="border:2px solid #1e8449;background:#f4fbf6;">
    <b>Final Step to Optimise Your Position</b><br><br>
 
    Building your emergency fund to 6 months would improve your score 
    from <b>${currentScore}</b> to <b>${efImprovedScore}</b>.
  </div>
  `;

}

else{

  upliftHTML = `
  <div class="box" style="border:2px solid #1e8449;background:#f4fbf6;">
    <b>You've Maximised Your Resilience</b><br><br>
 
    Your current setup already achieves a score of <b>100</b>.<br><br>
 
    There are no further structural improvements available.
  </div>
  `;

}

if(upliftHTML === ""){
  upliftHTML = `
  <div class="box" style="border:2px solid #1e8449;background:#f4fbf6;">
  <b>Your protection is well structured.</b><br><br>
 
  Based on the information provided, your income, mortgage and illness risks appear to be appropriately covered.
 
  <br><br>
 
  Regular reviews are still important to ensure your cover keeps pace with your circumstances. At ${BRAND.companyName}, we offer free annual reviews.
  </div>
  `;
}
  
let riskHTML = `
<div class="risk" style="background:${rc.c}">
<b>Overall Financial Resilience Score</b><br>
${rc.l}<br>
 
<div class="big">
  <span id="animatedScore" data-target="${risk}">0</span>/100
</div>
 
</div>
`;

let monthlySurplus = disp;

let monthsToBuild = null;

let efShortfall = Math.max((adjustedSpending * 6) - v("s1"), 0);
let requiredMonthly = efShortfall / 12;


if(monthlySurplus > 0){
  monthsToBuild = efShortfall / monthlySurplus;
}
months = v("s1") / (adjustedSpending || 1);

let lifestyleSpend = v("e1");
let reducedSpend = adjustedSpending;
let savings = v("s1");

let lifestyleMonths = lifestyleSpend > 0
  ? savings / lifestyleSpend
  : 0;

let reducedMonths = reducedSpend > 0
  ? savings / reducedSpend
  : 0;

let gapWeeks = Math.max(v("d1") - v("sp1"), 0);
let gapMonths = gapWeeks / 4.33;

let recommended = v("n1") * 6;
let moderate = lifestyleSpend * 6;
let minimum = reducedSpend * 6;

let efColour =
  lifestyleMonths >= 6 ? "#1e8449" :
  lifestyleMonths >= 3 ? "#e67e22" :
  "#b00020";
  
let gapText = "";

if(v("ip1") > 0){

  if(v("sp1") > 0 && gapWeeks > 0){
    gapText = `
    
You would need to rely on your savings for <b>${gapMonths.toFixed(1)} months</b> to cover the gap between your sick pay ending and your income protection beginning.
 
    `;
  }
  else if(v("sp1") == 0){
    gapText = `
    
    You would need to rely on your savings from incapacity until your income protection begins.
    `;
  }


gapText += `
  Income protection policies typically pay one month in arrears, 
  which can further stretch your savings.
`;
}
  
let rawMonthlyGap = Math.max(ip1.max - v("ip1"), 0);
let cleanMonthlyGap = rawMonthlyGap > 1 ? rawMonthlyGap : 0;

let bodyHTML = `
<div class="result">
 
 
${isWorking ? `
<div class="box" style="border-left:5px solid ${ipDot(ip1.monthly, ip1.max)==='green' ? '#1e8449' : ipDot(ip1.monthly, ip1.max)==='orange' ? '#e67e22' : '#b00020'}">
 
<b>Income Protection</b><br><br>
Maximum Available Monthly Benefit: £${fmt(ip1.max)}<br>
Planned Retirement Age: ${v("r1")}<br><br>

${
  v("ip1") > 0
  ? `
  Current Monthly Benefit: £${fmt(v("ip1"))}<br>
  Current Policy Ends at Age: ${v("ipe") || v("r1")}<br>

  Claim Period: ${
    document.getElementById("ipClaim")?.value === "Full-term"
      ? "Full-term"
      : document.getElementById("ipClaim")?.value + " Years"
  }<br>
  Deferred Period: ${v("d1")} weeks<br>
  Sick Pay: ${v("sp1")} weeks
  `
  : `
  <b>No income protection policy currently in place</b>
  `
}


<br><br>
 
<b>Shortfall based on your current cover vs maximum available:</b><br><br>
 
<span class="ind ${ipDot(ip1.monthly, ip1.max)}"></span>
Monthly Shortfall: £${fmt(cleanMonthlyGap)}<br>
 
<span class="ind ${ipDot(ip1.annual, ip1.max*12)}"></span>
Annual Shortfall: £${fmt(cleanMonthlyGap * 12)}<br>
 
<span class="ind ${ipDot(ip1.total, ip1.max*12*(v("r1")-v("a1")))}"></span>
Total Shortfall: £${fmt(cleanMonthlyGap * 12 * (v("r1") - v("a1")))}<br><br>
<hr style="border:none;border-top:1px solid #eee;margin:10px 0;">
<span class="ind ${sMax.cls}"></span>
${fmt(pMax)}% of max benefit (${sMax.txt})<br>
 
<span class="ind ${sExp.cls}"></span>
${fmt(pExp)}% of expenses (${sExp.txt})
 
<br><br>

${ipRec}

<hr style="border:none;border-top:1px solid #eee;margin:20px 0;">


${
  v("ip1") > 0
  ? (
      document.getElementById("ipClaim")?.value !== "Full-term"

      ? `
      <div class="text-block">
        <b>Your Existing Claim Period:</b>
        ${document.getElementById("ipClaim")?.value} years per claim
      </div>

      <div class="text-block">
        This policy has a limited claim period of
        <b>${document.getElementById("ipClaim")?.value} years per claim</b>.

        While multiple claims may be possible in the future, it would not provide the same level of long-term protection as a policy designed to pay through to retirement age if a long-term illness prevented you from returning to work.
      </div>
      `
      : `
      <div class="text-block">
        <b>Your Existing Claim Period:</b> Full-term
      </div>

      <div class="text-block">
        This policy is designed to provide benefits through to your planned retirement age if a long-term illness or injury prevents you from returning to work.
      </div>
      `
    )
  : ""
}

<div class="text-block">
  ${deferText}
</div>

${maxBenefitWarning}

</div>
` : ``}

 
${document.getElementById("hasMortgage")?.value !== "no" ? `
 
<div class="box" style="border-left:5px solid ${lifeDot(v("c1"), m)==='green' ? '#1e8449' : lifeDot(v("c1"), m)==='orange' ? '#e67e22' : '#b00020'}">
<b>Critical Illness Cover</b><br><br>
 
 
Mortgage Balance: £${fmt(m)}<br>
Mortgage Term: ${mt} years<br><br>
 
Current Cover: £${fmt(v("c1"))}<br>
Cover Term: ${v("ct1")} years<br><br>
<hr style="border:none;border-top:1px solid #eee;margin:10px 0;">
 
<span class="ind ${lifeDot(v("c1"), m)}"></span>
Shortfall: £${fmt(ciShort)}<br>
 
<span class="ind ${termDot(ciTerm)}"></span>
Term Shortfall: ${ciTerm} years
 
${ciRec}
</div>
 
 
<div class="box" style="border-left:5px solid ${lifeDot(v("l1"), m)==='green' ? '#1e8449' : lifeDot(v("l1"), m)==='orange' ? '#e67e22' : '#b00020'}">
<b>Life Cover</b><br><br>
 
 
Mortgage Balance: £${fmt(m)}<br>
Mortgage Term: ${mt} years<br><br>
 
Current Cover: £${fmt(v("l1"))}<br>
Cover Term: ${v("lt1")} years<br><br>
<hr style="border:none;border-top:1px solid #eee;margin:10px 0;">
 
<span class="ind ${lifeDot(v("l1"), m)}"></span>
Shortfall: £${fmt(lifeShort)}<br>
 
<span class="ind ${termDot(lifeTerm)}"></span>
Term Shortfall: ${lifeTerm} years
 
${lifeRec}
</div>
` : ""}
 
<div class="box" style="border-left:5px solid ${efColour}">
 
<div class="text-block">
  <b style="font-size:16px;">Emergency Fund</b>
</div>
 
<div class="text-block">
  You have £${fmt(savings)} in total savings.
</div>
 

<div class="text-block">
  <b>${
    isWorking
      ? "If you lost your job, your savings would cover:"
      : "Your savings would cover:"
  }</b>
</div>

<div class="text-block">
  • ${formatMonths(lifestyleMonths)} months of your current spending
</div>

${adjustedSpending < v("e1")
  ? `
  <div class="text-block">
  • Applying your planned spending reductions would extend this to
    ${formatMonths(reducedMonths)} months.
  </div>
  `
  : ""
}

 
${gapText ? `
<div class="text-block">
  ${gapText}
</div>` : ""}
 
<div class="text-block">
  <b>Emergency Fund Benchmarks:</b>
</div>
 
 
<div class="text-block">
  ${v("n1") > 0 ? `• <b>Recommended: £${fmt(recommended)}</b> (Enough to cover 6 months of your full income).<br>` : ""}
  • <b>Moderate: £${fmt(moderate)}</b> (Enough to cover 6 months of your current expenses).<br>
  • <b>Minimum: £${fmt(minimum)}</b> (Enough to cover 6 months of reduced spending after cutbacks).
</div>
 
 
<div class="text-block">
 
${v("n1") > 0
  ? `While a minimum level of savings can cover short-term gaps, a full 6-month emergency fund to cover your normal pay provides stronger long-term protection and flexibility as losing a job or other one-off emergencies could impact your savings buffer.`
  : (v("s1") / (v("e1") || 1)) >= 6
    ? `Your savings already provide more than 6 months of cover at your current spending, which is a strong starting position. However, with no income currently coming in, this buffer will still reduce over time if spending continues - building it further, or reducing spending, would extend how long it lasts.`
    : `While a minimum level of savings provides some short-term protection, building toward a full 6-month emergency fund provides stronger long-term flexibility - with no income currently coming in, your savings are your main financial resource, so a larger buffer directly reduces the pressure on you.`
}
 
</div>
</div>
 
`;
 

return {
  riskHTML,
  bodyHTML,
  upliftHTML,
  rc,
  adjustedSpending,
  monthsToBuild,
  requiredMonthly,
  ip1,
  tone,
  currentScore,
  improvedScore,
  lifeImprovedScore,
  ciImprovedScore
};

 
 
}

function getEssentialExpenses(){

  let total = 0;

  document.querySelectorAll(".exp").forEach(e => {

    let label = e.querySelector("label")?.innerText || "";


    let inputs = e.querySelectorAll(".amt");
    if(inputs.length === 0) return;

    let val = 0;

    inputs.forEach(input => {
      val += num(clean(input.value));
    });

    let active = e.querySelector(".toggle .on");
    let type = active ? active.innerText : "Non-essential";

    if(type === "Essential"){
      total += val;
    }

  });

  return total;
}


function buildMeaning(tone, primaryGap) {

let hasMortgage =
  document.getElementById("hasMortgage")?.value === "yes";

  // =============================
  // STRUCTURAL IP SHORTFALL - cover is already maxed out, but expenses
  // still exceed it. This is a distinct case from every branch below: it
  // isn't "you're under-protected," because there is no more cover left to
  // arrange. Checked FIRST, ahead of the tone-based branches, so a client
  // in this exact position never sees "strong position" or generic
  // "balanced" wording that would hide the real, unresolvable constraint
  // (their spending, not their cover, is the limiting factor).
  // =============================
  let ipMaxCalcForMeaning = ipCalc(v("ip1"), v("g1"), v("a1"), v("r1"), v("ipe"));
  let isWorkingForMeaning = document.getElementById("isWorking")?.value === "yes";

  // "Genuinely at max" is judged as a proportion of the benefit (98%+),
  // not a flat pound amount - a flat threshold doesn't scale: £15 short is
  // trivial on a £4,000/month benefit but a real, worth-chasing gap on a
  // £500/month one. 98% was chosen over the original 90% specifically
  // because a 10% gap is still genuinely worth a client conversation;
  // anything within the last 2% of max is the point where further
  // increases stop being a meaningful, actionable conversation.
  let ipGenuinelyAtMax = ipMaxCalcForMeaning.max > 0
    ? (v("ip1") / ipMaxCalcForMeaning.max) >= 0.98
    : true;

  // Whether even the true maximum available benefit would still fall short
  // of current spending - the insurer-imposed structural ceiling, separate
  // from whether the client has actually reached it yet.
  let maxWouldStillFallShort = isWorkingForMeaning && ipMaxCalcForMeaning.max < v("e1");

  // Case A - genuinely at (or within £1 of) max, and even that max doesn't
  // cover expenses. No further cover exists to arrange; the shortfall is
  // entirely structural.
  let ipStructuralShortfall =
    isWorkingForMeaning &&
    ipGenuinelyAtMax &&
    maxWouldStillFallShort;

  // Case B - below max, AND the max itself wouldn't fully cover expenses
  // either. Increasing cover closes PART of the gap (genuinely actionable),
  // but a residual, unavoidable shortfall remains even once fully optimised.
  let ipBelowMaxButMaxInsufficient =
    isWorkingForMeaning &&
    !ipGenuinelyAtMax &&
    maxWouldStillFallShort &&
    v("e1") > v("ip1");

  if (ipStructuralShortfall) {
    return `
      <div class="box" style="border-left:5px solid #b00020;background:#fdecea;">

        <div class="text-block" style="
        font-weight:700;
        font-size:24px;
        color:#b00020;
        margin-bottom:15px;
        text-align:center;
        ">
        ⚠️ What This Means for You
        </div>

        <div class="text-block">
          Your income protection is already set at the maximum benefit available to you - there is no further cover you can arrange to close this gap.
        </div>

        <div class="text-block">
          This means the score you're seeing isn't a result of being under-protected; it's driven by your current level of spending exceeding what any income protection policy is able to pay out.
        </div>

        <div class="text-block">
          If a claim were needed, the only way to close this gap would be reducing your monthly spending within the maximum monthly benefit, as your savings will eventually run out if you keep up your current rate of spending.
        </div>

        <div class="text-block" style="
        text-align:center;
        font-weight:700;
        margin-top:15px;
        padding-top:15px;
        border-top:1px solid rgba(0,0,0,.1);
        ">
          Ask yourself - if your income stopped tomorrow, what cutbacks would you be prepared to make?
        </div>

      </div>
    `;
  }

  // Case B - below max, but even max wouldn't fully cover expenses. Two
  // distinct facts need to both land here: increasing cover IS genuinely
  // actionable and worth doing, but it won't fully close the gap on its
  // own - a residual, structural shortfall remains even once optimised.
  if (ipBelowMaxButMaxInsufficient) {
    return `
      <div class="box" style="border-left:5px solid #e67e22;background:#fff6e5;">

        <div class="text-block" style="
        font-weight:700;
        font-size:24px;
        color:var(--primary-colour);
        margin-bottom:15px;
        text-align:center;
        ">
        ⚠️ What This Means for You
        </div>

        <div class="text-block">
          ${v("ip1") === 0
            ? "You currently have no income protection in place, and it doesn't cover your existing spending - arranging cover up to the maximum monthly benefit would close some of this gap."
            : "Your income protection is currently below the maximum benefit available to you and doesn't cover your existing spending - increasing your monthly benefit to the maximum allowed would close some of this gap."
          }
        </div>

        <div class="text-block">
          However, even at the maximum available benefit, ${v("ip1") === 0 ? "cover" : "your cover"} still wouldn't fully match your current spending. This is a limit set by insurers based on your income, not a choice you've made, so a small shortfall would remain even with cover fully optimised. Cutbacks in your current spending would still be needed.
        </div>

        <div class="text-block" style="
        text-align:center;
        font-weight:700;
        margin-top:15px;
        padding-top:15px;
        border-top:1px solid rgba(0,0,0,.1);
        ">
          Ask yourself - how would you plan for that residual gap, even after ${v("ip1") === 0 ? "arranging" : "increasing"} your income protection to the maximum monthly benefit allowed?
        </div>

      </div>
    `;
  }

  // =============================
  // STRONG POSITION
  // =============================
  if (tone === "strong") {
    return `
      <div class="box" style="border-left:5px solid #1e8449;background:#eefaf1;">

        

<div class="text-block" style="
font-weight:700;
font-size:24px;
color:var(--primary-colour);
margin-bottom:15px;
text-align:center;
">
✅ Why Your Position Is Strong
</div>

        <div class="text-block">
          Your financial position shows strong resilience, with a solid balance between protection and savings, although some areas may still benefit from review.
        </div>

        <div class="text-block">
          This means your key financial commitments and day-to-day spending are well supported, even if your circumstances change.
        </div>

        <div class="text-block">
          <b>Your current setup provides both protection and flexibility - this is exactly what financial resilience should look like.</b>
        </div>

        <div class="text-block">
          While no financial plan is ever static, you have built a strong and well-balanced foundation.
        </div>

        ${isWorkingForMeaning ? `
        <div class="text-block">
          Your savings are sufficient to cover your income protection waiting period, although building a larger buffer would improve long-term flexibility.
        </div>
        ` : `
        <div class="text-block">
          Your savings provide a solid buffer, although building a larger reserve would improve long-term flexibility.
        </div>
        `}

        
<div class="text-block" style="
text-align:center;
font-weight:700;
margin-top:15px;
padding-top:15px;
border-top:1px solid rgba(0,0,0,.1);
">
          
Ask yourself - how do you maintain this over time?
</div>

      </div>
    `;
  }

  // =============================
  // INCOME PROTECTION GAP
  // =============================

let efMonths =
  v("s1") / (v("e1") || 1);

if (primaryGap === "severe_ip") {
  return `
    <div class="box" style="
      border-left:5px solid #b00020;
      background:#fdecea;
    ">

<div class="text-block" style="
font-weight:700;
font-size:24px;
color:#b00020;
margin-bottom:15px;
text-align:center;
">

⚠️ What This Means for You
</div>
     
${
  v("ip1") === 0 && efMonths >= 12
  ? `

       
<div class="text-block">
  You currently have no income protection in place, meaning any long-term loss of income would need to be supported by your savings rather than an insurance policy.
</div>

<div class="text-block">
  Your savings currently provide a substantial financial buffer and could support you for a significant period of time, which reduces the immediate financial pressure many people would face.
</div>

<div class="text-block">
  However, savings are ultimately a finite resource. A prolonged period without income could gradually reduce the financial flexibility and security you have worked hard to build.
</div>

<div class="text-block" style="
text-align:center;
font-weight:700;
margin-top:15px;
padding-top:15px;
border-top:1px solid rgba(0,0,0,.1);
">

  Ask yourself - if a long-term illness prevented you from working, would you prefer to rely solely on your savings or protect your income?
</div>
        `
        : v("ip1") === 0
        ? `
        <div class="text-block">
          You currently have no income protection in place, meaning your income is not protected at all if illness or injury prevented you from working.
        </div>

        <div class="text-block">
          This means there would be an immediate financial shortfall, even before any discretionary spending is considered.
        </div>

        <div class="text-block">
          With limited savings currently available, this would leave little to fall back on - relying on savings alone is unlikely to provide a sustainable solution in this position.
        </div>

        <div class="text-block">
          This means your current setup is unlikely to remain sustainable over the long term without some form of income protection in place.
        </div>

        
<div class="text-block" style="
text-align:center;
font-weight:700;
margin-top:15px;
padding-top:15px;
border-top:1px solid rgba(0,0,0,.1);
">

          Ask yourself - how would you manage this shortfall from day one?
        </div>
        `
        : `
        <div class="text-block">
          Your income protection would not currently cover your essential monthly expenditure if your income stopped.
        </div>

        <div class="text-block">
          This means there would be an immediate financial shortfall, even before any discretionary spending is considered.
        </div>

        <div class="text-block">
          While savings may provide temporary support, relying on savings alone is unlikely to provide a sustainable long-term solution.
        </div>

        <div class="text-block">
          This means your current setup is unlikely to remain sustainable over the long term, as your expenditure would exceed your available income.
        </div>

        
<div class="text-block" style="
text-align:center;
font-weight:700;
margin-top:15px;
padding-top:15px;
border-top:1px solid rgba(0,0,0,.1);
">

          Ask yourself - how would you manage this shortfall from day one?
        </div>
        `
      }

    </div>
  `;
}

if (primaryGap === "ip") {

  let efMonths =
    v("s1") / (v("e1") || 1);

  // HIGH SAVINGS VERSION
  if(efMonths >= 12){

    return `
    <div class="box" style="
      border-left:5px solid #e67e22;
      background:#fff6e5;
    ">

    <div class="text-block" style="
    font-weight:700;
    font-size:24px;
    color:var(--primary-colour);
    margin-bottom:15px;
    text-align:center;
    ">
    ⚠️ What This Means for You
    </div>

    <div class="text-block">
      Your income protection would not currently cover your full monthly expenditure if your income stopped.
    </div>

    <div class="text-block">
      However, your savings provide a substantial financial buffer and significantly reduce the risks that would normally arise from this shortfall.
    </div>

    <div class="text-block">
      The key consideration is whether you would prefer to rely on your savings if your income stopped, or preserve those savings by increasing your level of income protection.
    </div>

    <div class="text-block" style="
    text-align:center;
    font-weight:700;
    margin-top:15px;
    padding-top:15px;
    border-top:1px solid rgba(0,0,0,.1);
    ">
    Ask yourself - would you rather spend your savings or protect them?
    </div>

    </div>
    `;
  }

  // STANDARD IP GAP VERSION
  return `
  <div class="box" style="
    border-left:5px solid #e67e22;
    background:#fff6e5;
  ">

  <div class="text-block" style="
  font-weight:700;
  font-size:24px;
  color:var(--primary-colour);
  margin-bottom:15px;
  text-align:center;
  ">
  ⚠️ What This Means for You
  </div>

  <div class="text-block">
    Your income protection would not currently cover your essential monthly expenditure if your income stopped.
  </div>

  <div class="text-block">
    This means there would be an immediate financial shortfall, even before any discretionary spending is considered.
  </div>

  <div class="text-block">
    While savings may provide temporary support, relying on savings alone is unlikely to provide a sustainable long-term solution.
  </div>

  <div class="text-block">
    This means your current setup is unlikely to remain sustainable over the long term, as your expenditure would exceed your available income.
  </div>

  <div class="text-block" style="
  text-align:center;
  font-weight:700;
  margin-top:15px;
  padding-top:15px;
  border-top:1px solid rgba(0,0,0,.1);
  ">
  Ask yourself - how would you manage this shortfall from day one?
  </div>

  </div>
  `;
}

if (primaryGap === "ci" && hasMortgage) {

  // Check real values instead of assuming - primaryGap can select "ci" even
  // when cover is PARTIAL (not zero) and even when savings DON'T actually
  // cover the mortgage. Previously this branch asserted "no CIC in place"
  // and "savings are sufficient" unconditionally, which produced false
  // claims whenever either assumption didn't hold.
  let ciCoverAmount = v("c1");
  let ciAmountShortfall = Math.max(v("m") - ciCoverAmount, 0);
  let ciTermShortfall = Math.max(v("mt") - v("ct1"), 0);
  let mortgageCoverRatio = v("s1") / (v("m") || 1);
  let savingsSufficient = mortgageCoverRatio >= 1;

  let cicStatusText;
  if(ciCoverAmount === 0){
    cicStatusText = "You currently have no critical illness cover in place.";
  } else if(ciAmountShortfall > 0 && ciTermShortfall > 0){
    cicStatusText = "Your critical illness cover is both lower than your mortgage balance and ends before your mortgage term.";
  } else if(ciAmountShortfall > 0){
    cicStatusText = "Your critical illness cover currently falls short of your mortgage balance.";
  } else if(ciTermShortfall > 0){
    cicStatusText = "Your critical illness cover ends before your mortgage term, even though the amount matches your mortgage balance.";
  } else {
    cicStatusText = "Your critical illness cover matches your mortgage balance and term.";
  }

  let savingsText = savingsSufficient
    ? "Your existing savings are sufficient to repay your mortgage if required, which significantly reduces the financial risk this gap would otherwise create."
    : "Your current savings would not fully cover this shortfall if required, so this remains a gap worth addressing.";

  return `
  <div class="box" style="
border-left:5px solid ${savingsSufficient ? "#1e8449" : "#e67e22"};
background:${savingsSufficient ? "#eefaf1" : "#fff6e5"};
  ">

  <div class="text-block" style="
    font-weight:700;
    font-size:24px;
    color:var(--primary-colour);
    margin-bottom:15px;
    text-align:center;
  ">
  ${savingsSufficient ? "✅" : "⚠️"} What This Means for You
  </div>

<div class="text-block">
  ${
    tone === "strong"
      ? "Your overall financial resilience is strong."
      : tone === "balanced"
      ? "Your overall financial resilience is reasonably balanced, though there is a clear area to address."
      : "Your overall financial resilience needs attention in more than one area."
  }
</div>

<div class="text-block">
  Your income protection and life cover provide a strong financial foundation.
</div>

<div class="text-block">
  ${cicStatusText}
</div>

<div class="text-block">
  ${savingsText}
</div>

<div class="text-block">
  Critical illness cover could help ${savingsSufficient ? "preserve those savings for retirement, emergencies and other future goals" : "close this gap and protect both your mortgage and your savings"}.
</div>


<div class="text-block" style="
text-align:center;
font-weight:700;
margin-top:15px;
padding-top:15px;
border-top:1px solid rgba(0,0,0,.1);
">

  Ask yourself - would you prefer to protect your savings as well as your mortgage?
</div>

  </div>
  `;
}

if (primaryGap === "life") {

  // Same fix as the CI branch above - primaryGap can select "life" with
  // PARTIAL cover in place (not zero), so the status text must reflect the
  // real v("l1") value rather than assuming zero every time.
  let lifeCoverAmount = v("l1");
  let lifeAmountShortfall = Math.max(v("m") - lifeCoverAmount, 0);
  let lifeTermShortfall = Math.max(v("mt") - v("lt1"), 0);
  let mortgageCoverRatio = v("s1") / (v("m") || 1);

  let lifeStatusText;
  if(lifeCoverAmount === 0){
    lifeStatusText = "You currently have no life cover in place.";
  } else if(lifeAmountShortfall > 0 && lifeTermShortfall > 0){
    lifeStatusText = "Your life cover is both lower than your mortgage balance and ends before your mortgage term.";
  } else if(lifeAmountShortfall > 0){
    lifeStatusText = "Your life cover currently falls short of your mortgage balance.";
  } else if(lifeTermShortfall > 0){
    lifeStatusText = "Your life cover ends before your mortgage term, even though the amount matches your mortgage balance.";
  } else {
    lifeStatusText = "Your life cover matches your mortgage balance and term.";
  }

  if(mortgageCoverRatio >= 1){

    return `
    <div class="box" style="
      border-left:5px solid #1e8449;
      background:#eefaf1;
    ">

    <div class="text-block" style="
      font-weight:700;
      font-size:24px;
      color:var(--primary-colour);
      margin-bottom:15px;
      text-align:center;
    ">
    ✅ What This Means for You
    </div>

    <div class="text-block">
      ${
        tone === "strong"
          ? "Your overall financial resilience is strong."
          : tone === "balanced"
          ? "Your overall financial resilience is reasonably balanced, though there is a clear area to address."
          : "Your overall financial resilience needs attention in more than one area."
      }
    </div>

    <div class="text-block">
      Your income protection, savings and wider financial position provide a strong foundation.
    </div>

    <div class="text-block">
      ${lifeStatusText}
    </div>

    <div class="text-block">
      Your existing savings are sufficient to repay your mortgage if required, which significantly reduces the financial risk this gap would otherwise create.
    </div>

    <div class="text-block">
      Life cover could help preserve those savings for retirement, emergencies and other future goals while still ensuring your mortgage could be cleared.
    </div>

    <div class="text-block" style="
      text-align:center;
      font-weight:700;
      margin-top:15px;
      padding-top:15px;
      border-top:1px solid rgba(0,0,0,.1);
    ">
      Ask yourself - would you prefer to protect your savings as well as your mortgage?
    </div>

    </div>
    `;
  }

  return `
  <div class="box" style="
    border-left:5px solid #e67e22;
    background:#fff6e5;
  ">

  <div class="text-block" style="
    font-weight:700;
    font-size:24px;
    color:var(--primary-colour);
    margin-bottom:15px;
    text-align:center;
  ">
  ⚠️ What This Means for You
  </div>

  <div class="text-block">
    ${
      tone === "strong"
        ? "Your overall financial resilience is strong."
        : tone === "balanced"
        ? "Your overall financial resilience is reasonably balanced, though there is a clear area to address."
        : "Your overall financial resilience needs attention in more than one area."
    }
  </div>

  <div class="text-block">
    Your income protection and savings provide a solid financial foundation.
  </div>

  <div class="text-block">
    The main area for improvement is your life cover.
  </div>

  <div class="text-block">
    ${lifeStatusText} Without sufficient life cover, your mortgage and other financial commitments may not be dealt with in the way you would intend if you were no longer here.
  </div>

  <div class="text-block" style="
  text-align:center;
  font-weight:700;
  margin-top:15px;
  padding-top:15px;
  border-top:1px solid rgba(0,0,0,.1);
  ">
    Ask yourself - would the outcome match your intentions for your home and finances?
  </div>

  </div>
  `;
}

  // =============================
  // NO INCOME, SAVINGS-DRIVEN - a non-working client whose Emergency Fund
  // is the identified primary driver is in a meaningfully different
  // position from a working client in the same primaryGap. For a working
  // client, ef_weak/ef_moderate is only reached once IP/Life/CIC are
  // already near-optimal and any deferred-period gap is already covered -
  // genuinely lower stakes, and the generic wording below is a fair
  // description. With no income at all, there's no IP acting as a
  // backstop in the first place - savings are this client's ONLY line of
  // defence, not a supplementary buffer, so the same generic wording
  // understates a genuinely precarious position.
  // =============================
  if (!isWorkingForMeaning && primaryGap === "no_income_shortfall") {
    return `
      <div class="box" style="border-left:5px solid #e67e22;background:#fff6e5;">

        <div class="text-block" style="
        font-weight:700;
        font-size:24px;
        color:var(--primary-colour);
        margin-bottom:15px;
        text-align:center;
        ">
        ⚠️ What This Means for You
        </div>

        <div class="text-block">
          You do not currently have any income of your own, so your savings are your main source of financial support while your circumstances stay as they are.
        </div>

        <div class="text-block">
          However large your savings feel right now, they are a finite resource with nothing currently coming in to replace them - without a change in income, they will eventually run down if regular spending continues.
        </div>

        <div class="text-block">
          Building your savings further, or reviewing how long you could realistically manage without income, would meaningfully strengthen your position.
        </div>

        <div class="text-block" style="
        text-align:center;
        font-weight:700;
        margin-top:15px;
        padding-top:15px;
        border-top:1px solid rgba(0,0,0,.1);
        ">
          Ask yourself - if this situation continued for longer than expected, how would you manage once your savings ran low?
        </div>

      </div>
    `;
  }
  // =============================
  // DEFAULT / BALANCED
  // =============================
  return `
<div class="box" style="border-left:5px solid #e67e22;
background:#fff6e5;
">


<div class="text-block" style="
font-weight:700;
font-size:24px;
color:var(--primary-colour);
margin-bottom:15px;
text-align:center;
">
⚠️  What This Means for You
</div>


      <div class="text-block">
        Your financial position currently relies on a combination of protection, savings and spending flexibility to maintain ${hasMortgage ? "your mortgage and ongoing commitments" : "your ongoing commitments"}.
      </div>

      <div class="text-block">
        This introduces a degree of uncertainty, particularly if spending reductions are not sustainable over time${hasMortgage ? " or if your mortgage costs were to increase" : ""}.
      </div>

      <div class="text-block">
        Over time, this kind of reliance can reduce financial flexibility and make it harder to maintain consistency during periods of change.
      </div>

      
<div class="text-block" style="
text-align:center;
font-weight:700;
margin-top:15px;
padding-top:15px;
border-top:1px solid rgba(0,0,0,.1);
">

        Ask yourself - would you prefer certainty, or reliance on adjustments?
      </div>

    </div>
  `;
}


function buildOpportunityBox(){

  let disp = v("n1") - v("e1");
  let isWorkingForOpportunity = document.getElementById("isWorking")?.value === "yes";

  // A genuinely zero-income client can't create "financial flexibility"
  // by adjusting spending - there's no income to redirect in the first
  // place. Savings are the only real lever here, so this needs its own
  // wording rather than the generic "small changes" fallback below, which
  // implies an easy spending tweak that doesn't apply when income is £0.
  if(!isWorkingForOpportunity && v("n1") === 0){
    return `
    <div class="box opportunity-box" style="border:2px solid #fff2e6;background:#fff7ef;">
      
<b>💡 Opportunity to Strengthen Your Position</b><br><br>
With no income currently coming in, building your savings further is the clearest way to strengthen your position - there's no spending to redirect while your circumstances stay as they are.

    </div>`;
  }

  if(disp <= 0){
    return `
    <div class="box opportunity-box" style="border:2px solid #fff2e6;background:#fff7ef;">
      
<b>💡 Opportunity to Strengthen Your Position</b><br><br>
Small changes could further improve your financial resilience and increase your overall level of protection.

    </div>`;
  }

let fullTermClaim =
  document.getElementById("ipClaim")?.value === "Full-term";

let ipTermGap =
  Math.max(
    v("r1") - (v("ipe") || v("r1")),
    0
  );


let maxIP = ipCalc(
  v("ip1"),
  v("g1"),
  v("a1"),
  v("r1"),
  v("ipe")
).max;

let ipMaxed =
  v("ip1") >= (maxIP * 0.9) &&
  ipTermGap === 0 &&
  fullTermClaim;

  if(!ipMaxed){
    return `
    
<div class="box opportunity-box" style="
border:2px solid var(--secondary-colour);
background:#fffbea;
">
  

<b style="
font-size:24px;
color:var(--primary-colour);
display:block;
margin-bottom:15px;
text-align:center;
">

💡 Financial Flexibility
</b>
      
<div style="
text-align:center;
margin-bottom:15px;
">

<div style="
font-size:42px;
font-weight:700;
color:var(--primary-colour);
line-height:1;
">
£${fmt(disp)}
</div>

<div style="
margin-top:8px;
font-weight:600;
">
Available every month without reducing your lifestyle
</div>

</div>
      
You currently have money remaining each month after covering your regular spending.

This creates flexibility to strengthen your financial resilience while maintaining your current lifestyle.



    </div>`;
  }

  return `


<div class="box opportunity-box" style="
border:2px solid var(--secondary-colour);
background:#fffbea;
">
    
<b style="
font-size:24px;
color:var(--primary-colour);
display:block;
margin-bottom:15px;
text-align:center;
">
💡 Financial Flexibility
</b>

<div style="
text-align:center;
margin-bottom:15px;
">

<div style="
font-size:42px;
font-weight:700;
color:var(--primary-colour);
line-height:1;
">
£${fmt(disp)}
</div>

<div style="
margin-top:8px;
font-weight:600;
">
Available every month without reducing your lifestyle
</div>

</div>

    
After covering your regular spending, you still have money available each month.

This provides flexibility to strengthen protection, build savings or prepare for future financial changes without reducing your current lifestyle.


  </div>`;
}

function buildUplift(scores = {}){

  let {
    currentScore = null,
    improvedScore = null,
    lifeImprovedScore = null,
    ciImprovedScore = null
  } = scores;

  function scoreLine(from, to){
    if(from == null || to == null || to <= from) return "";

    return `
    <div style="margin-top:10px;font-weight:600;">
      

<div style="
font-size:24px;
font-weight:700;
color:#1e8449;
margin-top:15px;
text-align:center;
">
${from} → ${to}
</div>

<div style="
text-align:center;
font-weight:600;
">
Resilience Score Improvement
</div>


    </div>`;
  }

let maxIP = ipCalc(
  v("ip1"),
  v("g1"),
  v("a1"),
  v("r1"),
  v("ipe")
).max;


let lifeShort = Math.max(v("m") - v("l1"), 0);
let lifeTerm = Math.max(v("mt") - v("lt1"), 0);

let ciShort = Math.max(v("m") - v("c1"), 0);
let ciTerm = Math.max(v("mt") - v("ct1"), 0);

let hasMortgage =
  document.getElementById("hasMortgage")?.value === "yes";

let savingsCoverMortgage =
  v("s1") >= v("m");

let hasLifeGap =
  hasMortgage &&
  (lifeShort > 0 || lifeTerm > 0) &&
  !savingsCoverMortgage;

let hasCIGap =
  hasMortgage &&
  (ciShort > 0 || ciTerm > 0) &&
  !savingsCoverMortgage;

let ipFullyOptimised =
  (maxIP > 0 ? (v("ip1") / maxIP) >= 0.98 : true) &&
  (v("ipe") || v("r1")) >= v("r1") &&
  document.getElementById("ipClaim")?.value === "Full-term";

  // ✅ BUILD OPTIONS
  let options = [];

  if(!ipFullyOptimised && improvedScore > currentScore){
    options.push({
      type: "ip",
      gain: improvedScore - currentScore,
      html: `
      <div class="box" style="border:2px solid #1e8449;background:#f4fbf6;">
        
<b style="
font-size:22px;
color:#1e8449;
display:block;
margin-bottom:12px;
text-align:center;
">
✅ Where You Could Strengthen This
</b>
       
Increasing your income protection to the maximum available benefit, with cover continuing to retirement age and a full-term claim period, would reduce the protection gap identified in this report.

This would provide greater certainty that your essential monthly expenditure could continue to be met if your income stopped.



        ${scoreLine(currentScore, improvedScore)}
      </div>`
    });
  }

  
if(
  hasLifeGap &&
  lifeImprovedScore > currentScore
){

    options.push({
      type: "life",
      gain: lifeImprovedScore - currentScore,
      html: `
      <div class="box" style="border:2px solid #1e8449;background:#f4fbf6;">
        
<b style="
font-size:22px;
color:#1e8449;
display:block;
margin-bom:12px;
text-align:center;
">
✅ Where You Could Strengthen This
</b>
        Aligning your life cover with your mortgage would help ensure it can be passed on in the way you would intend.

        ${scoreLine(currentScore, lifeImprovedScore)}
      </div>`
    });
  }

  
if(
  hasCIGap &&
  ciImprovedScore > currentScore
){

    options.push({
      type: "ci",
      gain: ciImprovedScore - currentScore,
      html: `
      <div class="box" style="border:2px solid #1e8449;background:#f4fbf6;">
        
<b style="
font-size:22px;
color:#1e8449;
display:block;
margin-bottom:12px;
text-align:center;
">
✅ Where You Could Strengthen This
</b>
        Matching your critical illness cover to your mortgage would reduce financial pressure on your home during recovery.

        ${scoreLine(currentScore, ciImprovedScore)}
      </div>`
    });
  }

if (
  hasMortgage &&
  v("c1") === 0 &&
  v("s1") >= v("m")
)
{
  options.push({
    type: "ci_savings",
    gain: ciImprovedScore - currentScore,

    html: `
      <div class="box" style="border:2px solid #1e8449;background:#f4fbf6;">

        <b style="
          font-size:22px;
          color:#1e8449;
          display:block;
          margin-bottom:12px;
          text-align:center;
        ">
          ✅ Where You Could Strengthen This
        </b>

        While your savings are sufficient to repay your mortgage, critical illness cover could allow those savings to remain available for retirement, emergencies and other future goals.

        ${scoreLine(currentScore, ciImprovedScore)}

      </div>
    `
  });
}

  // No-income clients with real expenses should never land on "nothing to
  // improve" - savings-building is always the actionable lever here (same
  // reasoning as the dedicated buildMeaning() box above), so this needs to
  // be checked before falling through to the generic "well balanced"
  // fallback, which would otherwise directly contradict a Weak/capped
  // score with "your current setup is well balanced."
  let isWorkingForUplift = document.getElementById("isWorking")?.value === "yes";

  if(!isWorkingForUplift && v("e1") > 0 && options.length === 0){
    return `
    <div class="box" style="border:2px solid #1e8449;background:#f4fbf6;">
      <b style="
      font-size:22px;
      color:#1e8449;
      display:block;
      margin-bottom:12px;
      text-align:center;
      ">
      ✅ Where You Could Strengthen This
      </b>
      With no income currently coming in, building your savings further is the most direct way to strengthen your position - they're the main thing standing between you and financial pressure while your circumstances stay as they are.
    </div>`;
  }

  // ✅ NOTHING TO IMPROVE
  if(options.length === 0){
    return `
    <div class="box" style="border:2px solid #1e8449;background:#f4fbf6;">
      <b>Maintaining Your Position</b><br><br>
      Your current setup is well balanced - regular reviews will help keep it aligned with ${hasMortgage ? "your mortgage and circumstances" : "your circumstances"}.
    </div>`;
  }

  // ✅ PICK BEST OPTION (HIGHEST SCORE GAIN)
  options.sort((a,b) => b.gain - a.gain);

  return options[0].html;
}

function generateAnalysis(){

let step8 = document.getElementById("step8");

["3","4","5","6"].forEach(step => {
  plannerData["step" + step] = getStepData(step);
});

calcBudget();

  
let isWorking = document.getElementById("isWorking")?.value === "yes";
  
let hasDep = document.getElementById("dep")?.value === "yes";

let dependencyMessageIP = hasDep
  ? `The impact extends beyond your own finances, as others may rely on your income to maintain their current standard of living.`
  : `This affects your ability to maintain your current lifestyle and financial independence.`;

let dependencyMessageLife = hasDep
  ? `This may affect whether those important to you are left in the financial position you would intend.`
  : `This may affect the financial legacy you leave behind.`;

let dependencyMessageCI = hasDep
  ? `This could place additional pressure on both your finances and those who depend on you during recovery.`
  : `This could make recovery more challenging by creating additional financial pressures at the same time.`;

let fullName = document.getElementById("clientName")?.value || "";
let firstName = fullName.split(" ")[0] || "";

let namePrefix = firstName ? firstName + ", " : "";
let summaryTitle = firstName ? firstName + "'s Summary" : "Summary";


let income = v("n1");
let totalExpenses = 0;

document.querySelectorAll(".exp .amt").forEach(input => {
  totalExpenses += num(input.value);
});

let message = "";

if(income === 0 && totalExpenses === 0){
  message = `
  <b>👉 Start by entering your details.</b><br><br>
  Add your income and some expenses above to calculate your financial resilience.
  `;
}

else if(income === 0 && (isWorking || v("s1") <= 0)){
  message = `
  <b>⚠️ Add your income to continue.</b><br><br>
  This allows us to assess affordability and calculate your resilience score.
  `;
}

// Not working with £0 income AND real savings is a genuine, common
// scenario (e.g. between jobs) rather than a data-entry gap - the client
// is temporarily living off savings, which is exactly what the Emergency
// Fund and Life/CIC sections are built to assess. Only a working client
// entering £0, or a non-working client with £0 income AND £0 savings
// (nothing at all to build a picture from), still gets blocked above.

else if(totalExpenses === 0){
  message = `
  <b>⚠️ Add your expenses to continue.</b><br><br>
  This helps us understand your spending and assess your financial resilience.
  `;
}

if(message !== ""){
  return { status: "incomplete", message };
}


let base;
try{
  base = originalCalc();
}
catch(e){
  console.error(e);
  return { status: "error", message: "<b>Something broke in calculation.</b>" };
}



if(!base){
  return { status: "error", message: "<b>Calculation failed. Please refresh.</b>" };
}


let monthsToBuild = base.monthsToBuild;
let requiredMonthly = base.requiredMonthly;

let ip1 = base.ip1;

let tone = base.tone;

let primaryGap = getPrimaryDriver({
  currentScore: base.currentScore,
  improvedScore: base.improvedScore,
  lifeImprovedScore: base.lifeImprovedScore,
  ciImprovedScore: base.ciImprovedScore
});


let monthsEF = v("s1") / (base.adjustedSpending || 1);

let gapWeeks = Math.max(v("d1") - v("sp1"), 0);
let gapMonths = gapWeeks / 4.33;


let hasStrongSavings = monthsEF >= 6;

let coversGap =
  gapMonths > 0 &&
  v("s1") >= (gapMonths * base.adjustedSpending);

let unusableIP =
  v("ip1") > 0 &&                       
  gapMonths >= 2.5 &&                       
  v("s1") < (gapMonths * base.adjustedSpending);

  
let partiallyUsableIP =
  v("ip1") > 0 &&
  gapMonths >= 2.5 &&
  v("s1") >= (gapMonths * base.adjustedSpending) &&
  v("s1") < (gapMonths * 1.5 * base.adjustedSpending);

let essential = getEssentialExpenses();

let plannerUsed = false;

document.querySelectorAll(".exp").forEach(e=>{

  let amtInput = e.querySelector(".amt");

  if(amtInput && num(amtInput.value) > 0){
    plannerUsed = true;
  }

});


if(!plannerUsed){

  let impactHTML = `
 
${namePrefix}you have provided total monthly expenses, but have not completed a full breakdown.<br><br>
 
Your resilience score is based on total spending and does not reflect potential reductions.<br><br>
 
<b>Complete the planner for a more accurate assessment.</b>
 
`;

  return { status: "plannerIncomplete", base, message: impactHTML };
}

let ip = v("ip1");
let trueShortfall = Math.max(v("e1") - ip, 0);

let ipTermGap = Math.max(
  v("r1") - (v("ipe") || v("r1")),
  0
);

let savings = v("s1");
let m = v("m"), mt = v("mt");

let disp = Math.max(v("n1") - v("e1"), 0);

let meaningHTML = buildMeaning(tone, primaryGap);


let lifeShort = Math.max(m - v("l1"), 0);
let lifeTerm = Math.max(mt - v("lt1"), 0);

let ciShort = Math.max(m - v("c1"), 0);
let ciTerm = Math.max(mt - v("ct1"), 0);



let hasProtection = document.getElementById("hasProtection")?.value === "yes";


let fullTermClaim =
  document.getElementById("ipClaim")?.value === "Full-term";

let fullIP =
  ip >= (ip1.max * 0.9) &&
  ipTermGap === 0 &&
  fullTermClaim;

if(
  fullIP &&
  (lifeShort > 0 || lifeTerm > 0) &&
  ciShort === 0 &&
  ciTerm === 0 &&
  monthsEF >= 6
){
  base.lifeImprovedScore = 100;
}

if(
  isWorking &&
  !fullIP &&
  lifeShort === 0 &&
  lifeTerm === 0 &&
  ciShort === 0 &&
  ciTerm === 0 &&
  monthsEF >= 6
){
  base.improvedScore = 100;
}


let adequateIP =
  ip >= v("e1") &&
  ip < (ip1.max * 0.9) &&
  fullTermClaim;

let adjustedSpending = base.adjustedSpending;
let nonEssential = [];
let flexibleCuts = [];

let needsEmergencyPlan =
(
  ip < adjustedSpending ||
  unusableIP ||
  partiallyUsableIP
);

document.querySelectorAll(".exp").forEach(e => {


let val = 0;

e.querySelectorAll(".amt").forEach(input => {
  
let cleaned = clean(input.value);
val += num(cleaned);

});

let active = e.querySelector(".toggle .on");
let type = val === 0
  ? "Non-essential"
  : (active ? active.innerText : "Non-essential");

let label = e.querySelector("label")?.innerText;

if(!label || val <= 0) return;

if(type === "Flexible"){
  let r = e.querySelector('input[type="range"]');
  let pct = r ? r.value : 100;

  let kept = val*(pct/100);
  let cut = val-kept;

  if(cut > 1){
    flexibleCuts.push(`• ${label}: £${kept.toFixed(0)} (£${cut.toFixed(0)} less)`);
  }
}

if(type === "Non-essential"){
  nonEssential.push(`• ${label}: £0 (£${val.toFixed(0)} less)`);
}

});


let cutsFullHTML = "";

if(nonEssential.length){
  cutsFullHTML += `
  <div style="margin-top:15px;"></div>

  <b>Cut these in full:</b>
  <br>
  ${nonEssential.join("<br>")}
  <br><br>
  `;
}

if(flexibleCuts.length){
  cutsFullHTML += `
  <div style="margin-top:15px;"></div>

  <b>Reduce spending on:</b>
  <br>
  ${flexibleCuts.join("<br>")}
  `;
}

if(!nonEssential.length && !flexibleCuts.length){
  cutsFullHTML = "No spending reductions identified.";
}

let hasReductions =
  adjustedSpending < v("e1");

let budgetSummaryHTML = `
<div class="text-block" style="margin-bottom:12px;">
  <b>Spending comparison:</b><br>
  Your current monthly spending is <b>£${fmt(v("e1"))}</b>.<br>
  With the changes you selected, this reduces to <b>£${fmt(adjustedSpending)}</b>.
</div>
`;

let emergencyPlanHTML =
  hasReductions
  ? `
    <div class="planned-spending-title">
      Your Emergency Spending Plan
    </div>

    ${budgetSummaryHTML}

    ${cutsFullHTML}
    `
  : `
    <div class="text-block">
      All spending categories were classified as essential.
    </div>

    <div class="text-block">
      This means no spending reductions have been identified within your emergency budget plan, and your resilience relies primarily on your savings and protection arrangements.
    </div>
    `;

  return {
    status: "ok",
    base, isWorking, hasDep,
    dependencyMessageIP, dependencyMessageLife, dependencyMessageCI,
    fullName, firstName, namePrefix, summaryTitle,
    monthsToBuild, requiredMonthly, ip1, tone, primaryGap,
    monthsEF, gapWeeks, gapMonths, hasStrongSavings, coversGap,
    unusableIP, partiallyUsableIP, essential, plannerUsed,
    ip, trueShortfall, ipTermGap, savings, m, mt, disp, meaningHTML,
    lifeShort, lifeTerm, ciShort, ciTerm, hasProtection, fullTermClaim,
    fullIP, adequateIP, adjustedSpending, nonEssential, flexibleCuts, needsEmergencyPlan, cutsFullHTML, budgetSummaryHTML, hasReductions, emergencyPlanHTML

  };
}


function generateSummary(analysis){

  let {
    base, isWorking, dependencyMessageIP, dependencyMessageLife, dependencyMessageCI,
    namePrefix, ip1, tone, monthsEF, gapMonths, hasStrongSavings,
    unusableIP, partiallyUsableIP, ip, trueShortfall, ipTermGap, savings, m, mt,
    lifeShort, lifeTerm, ciShort, ciTerm, hasProtection, fullIP, adequateIP,
    adjustedSpending, needsEmergencyPlan, cutsFullHTML, budgetSummaryHTML, hasReductions, emergencyPlanHTML, meaningHTML

  } = analysis;

let ipSummaryHTML = `
<div class="text-block sectionDivider">
  <b>• Income Protection</b>
</div>
`;

let currentMonths =
  v("s1") / (v("e1") || 1);

let reducedMonthsSummary =
  v("s1") / (base.adjustedSpending || 1);

let savingsDurationText = `
<div class="text-block">
  Based on your current spending, your savings could support you for approximately
  <b>${currentMonths.toFixed(1)} months</b>.
</div>

<div class="text-block">
  If you implemented the spending reductions you selected,
  this would increase to
  <b>${reducedMonthsSummary.toFixed(1)} months</b>.
</div>
`;

if(!hasProtection){

  ipSummaryHTML += `
  <div class="text-block">
    You currently have no financial protection in place.
  </div>
 
  <div class="text-block">
    This means your resilience depends entirely on your savings and your ability to reduce spending if your income stops.
  </div>
  `;

}

else if(!isWorking){

  ipSummaryHTML += `
  <div class="text-block">
    Income protection has not been assessed, as no employment income has been provided.
  </div>
  `;

}

else if(v("ip1") === 0){

  let summaryMonths = v("s1") / (v("e1") || 1);

  let emergencyMonths =
    v("s1") / (base.adjustedSpending || 1);


  ipSummaryHTML += `
  <div class="text-block">
    You do not currently have income protection in place.
  </div>

  <div class="text-block">
    While your savings provide a strong financial buffer and could support you for approximately
    <b>${summaryMonths.toFixed(1)} months</b>,
    your income is not currently protected if illness or injury prevents you from working.
  </div>

  <div class="text-block">
    Based on your income, you could access up to
    <b>£${fmt(ip1.max)}</b> per month of income protection.
  </div>

  `;
}


else if(fullIP){

  if(v("ip1") >= v("e1")){

    ipSummaryHTML += `
    <div class="text-block">
      Your income protection is aligned with the maximum available benefit and your planned retirement age.
    </div>

    <div class="text-block">
      This provides a strong level of protection against long-term loss of income and supports your financial resilience if you are unable to work.
    </div>
    `;

  }

}


else if(adequateIP && ipTermGap === 0){

  ipSummaryHTML += `
  <div class="text-block">
    Your income protection currently covers your monthly expenditure, but is below the maximum benefit available.
  </div>

  <div class="text-block">
    While you would not face an immediate shortfall based on your current spending, increasing cover could provide greater protection against future increases in living costs and financial commitments.
  </div>

  ${savingsDurationText}
  `;

}

else{

  ipSummaryHTML += `
  
<div class="text-block">
  Your current income protection would not fully cover your current monthly expenditure if your income stopped.
</div>

<div class="text-block">
  This means there would be an immediate monthly shortfall based on your current spending commitments.
</div>

  <div class="text-block">
    Your current monthly benefit is <b>£${fmt(ip)}</b>.
  </div>

  <div class="text-block">
    Based on your income, the maximum available benefit is
    <b>£${fmt(ip1.max)}</b> per month${(ip1.max - ip) > 1 ? ` - £${fmt(ip1.max - ip)} more than your current cover` : ""}.
  </div>
  
${savingsDurationText}

  `;

}
  
let ipIntroBlock = isWorking ? ipSummaryHTML : "";

let efSummaryHTML = `
<div class="text-block sectionDivider">
  <b>• Emergency Fund</b>
</div>
`;

let efMonths = v("s1") / (v("e1") || 1);

if(v("s1") === 0){

  efSummaryHTML += `
  <div class="text-block">
    You do not currently have savings available to support a period without income.
  </div>
  `;

}

else if(efMonths >= 6){

  let reducedMonthsForSummary = v("s1") / (adjustedSpending || 1);

  efSummaryHTML += `
  <div class="text-block">
    Your savings could cover approximately <b>${efMonths.toFixed(1)} months</b>
    of your current spending.
  </div>

  ${adjustedSpending < v("e1")
    ? `
    <div class="text-block">
      Applying your planned spending reductions would extend this to <b>${reducedMonthsForSummary.toFixed(1)} months</b>.
    </div>
    `
    : ""
  }
  `;

}

else{

  let reducedMonthsForSummaryLow = v("s1") / (adjustedSpending || 1);

  efSummaryHTML += `
  <div class="text-block">
    Your savings may not provide a reliable ${isWorking ? "financial buffer if you lost your job" : "long-term financial buffer"}.
  </div>

  <div class="text-block">
    Based on your current lifestyle, ${isWorking ? "in the event of losing your job, " : ""}your savings would last approximately <b>${efMonths.toFixed(1)} months</b>, which may not be sufficient for longer-term resilience.
  </div>

  ${adjustedSpending < v("e1")
    ? `
    <div class="text-block">
      Applying your planned spending reductions would extend this to <b>${reducedMonthsForSummaryLow.toFixed(1)} months</b>.
    </div>
    `
    : ""
  }

  <div class="text-block">
    As a result, you may need to rely on immediate spending changes or external support to maintain financial stability.
  </div>
  `;

}

let protectionHTML = "";

if(document.getElementById("hasMortgage")?.value !== "no"){

if(v("l1") === 0){

  let mortgageCoverRatio =
    v("s1") / (m || 1);

  protectionHTML += `
  <div class="text-block sectionDivider">
    <b>• Life Cover</b>
  </div>

  <div class="text-block">
    You currently have no life cover in place.
  </div>
  `;

  if(mortgageCoverRatio >= 1){

    protectionHTML += `
    <div class="text-block">
      Your existing savings are sufficient to repay your mortgage in full if required.
    </div>

    <div class="text-block">
      This significantly reduces the financial risk that would normally exist in the absence of life cover.
    </div>

    <div class="text-block">
      However, doing so could require using funds that may currently be intended for retirement, emergencies or future plans.
    </div>
    `;

  }
  else{

    protectionHTML += `
    <div class="text-block">
      This means your mortgage and financial commitments would remain outstanding in the event of death.
    </div>

    ${
      v("s1") >= (m * 0.5)
      ? `
      <div class="text-block">
        While your savings may help reduce some of this risk, using capital to repay debts could affect other goals such as retirement planning, emergencies or future flexibility.
      </div>
      `
      : ""
    }
    `;

  }

}
  
else if(lifeShort > 0 || lifeTerm > 0){

  protectionHTML += `
  <div class="text-block sectionDivider">
    <b>• Life Cover</b>
  </div>
  `;

  if(lifeShort > 0 && lifeTerm > 0){

    protectionHTML += `
    <div class="text-block">
      Your life cover is lower than your mortgage by <b>£${lifeShort.toLocaleString()}</b>
      and ends <b>${lifeTerm} years early</b>.
    </div>

    <div class="text-block">
      In practical terms, this means your mortgage would not be fully repaid in all scenarios, leaving a potential financial burden on those you leave behind.
    </div>

    <div class="text-block">
      ${dependencyMessageLife}
    </div>
    `;

  }
  else if(lifeShort > 0){

    protectionHTML += `
    <div class="text-block">
      Your life cover is lower than your mortgage by <b>£${lifeShort.toLocaleString()}</b>.
    </div>

    <div class="text-block">
      This means your mortgage may not be fully repaid if you were to die, potentially leaving an outstanding balance.
    </div>

    <div class="text-block">
      ${dependencyMessageLife}
    </div>
    `;

  }
  else if(lifeTerm > 0){

    protectionHTML += `
    <div class="text-block">
      Your life cover ends <b>${lifeTerm} years before</b> your mortgage.
    </div>

    <div class="text-block">
      This creates a period where your mortgage would still exist without any protection in place.
    </div>

    <div class="text-block">
      ${dependencyMessageLife}
    </div>
    `;

  }

}
else{

  protectionHTML += `
  <div class="text-block sectionDivider">
    <b>• Life Cover</b>
  </div>

  <div class="text-block">
    ${(v("l1") > m || v("lt1") > mt)
      ? "Your life cover exceeds your mortgage balance and/or remaining term."
      : "Your life cover matches your mortgage balance and remaining term."
    }
  </div>

  <div class="text-block">
    ${(v("l1") > m || v("lt1") > mt)
      ? "This means your mortgage could be repaid in full if you died during the mortgage term, with cover to spare - worth reviewing, as right-sizing it could reduce your monthly premium."
      : "This means your mortgage could be repaid in full if you died during the mortgage term."
    }
  </div>
  `;

}


if(document.getElementById("hasMortgage")?.value !== "no"){

  let mortgageCoverRatio =
    v("s1") / (v("m") || 1);

  // NO CRITICAL ILLNESS COVER

 if(v("c1") === 0){

  protectionHTML += `
  <div class="text-block sectionDivider">
    <b>• Critical Illness Cover</b>
  </div>

<div class="text-block">
  You currently have no critical illness cover in place.
</div>

<div class="text-block">
  This means a serious illness could result in additional financial pressure at the same time as you are focusing on recovery.
</div>

  `;

if(mortgageCoverRatio >= 1){

  protectionHTML += `
  <div class="text-block">
    Your existing savings are sufficient to repay your mortgage in full if required.
  </div>
  
<div class="text-block">
  This significantly reduces the financial risk that would normally exist in the absence of critical illness cover.
</div>

  <div class="text-block">
    However, doing so could require using funds that may currently be intended for other objectives, such as retirement, emergencies or future plans.
  </div>
  `;

  }
  else if(mortgageCoverRatio >= 0.5){

    protectionHTML += `
    <div class="text-block">
      Your savings could help reduce some of the financial pressure created by a serious illness, although they would not fully cover your mortgage balance.
    </div>
    `;

  }
  else{

    protectionHTML += `
    <div class="text-block">
      Your current savings would cover only a small proportion of your mortgage balance, meaning a serious illness could create significant financial pressure.
    </div>

    <div class="text-block">
      ${dependencyMessageCI}
    </div>
    `;

  }

}
else if(ciShort > 0 || ciTerm > 0){

  protectionHTML += `
  <div class="text-block sectionDivider">
    <b>• Critical Illness Cover</b>
  </div>
  `;

  if(ciShort > 0 && ciTerm > 0){

    protectionHTML += `
    <div class="text-block">
      Your cover is lower than your mortgage by <b>£${ciShort.toLocaleString()}</b>
      and ends <b>${ciTerm} years early</b>.
    </div>

    <div class="text-block">
      The impact is that you may not have sufficient funds to repay your mortgage or reduce financial pressure in all scenarios.
    </div>

    <div class="text-block">
      ${dependencyMessageCI}
    </div>
    `;

  }
  else if(ciShort > 0){

    protectionHTML += `
    <div class="text-block">
      Your cover is lower than your mortgage by <b>£${ciShort.toLocaleString()}</b>.
    </div>

    <div class="text-block">
      This means you may need to rely on other resources if you were seriously ill.
    </div>

    <div class="text-block">
      ${dependencyMessageCI}
    </div>
    `;

  }
  else if(ciTerm > 0){

    protectionHTML += `
    <div class="text-block">
      Your cover ends <b>${ciTerm} years before</b> your mortgage.
    </div>

    <div class="text-block">
      This creates a period where you would have no protection in place while the mortgage remains outstanding.
    </div>

    <div class="text-block">
      ${dependencyMessageCI}
    </div>
    `;

  }

}
else{

  protectionHTML += `
  <div class="text-block sectionDivider">
    <b>• Critical Illness Cover</b>
  </div>

  <div class="text-block">
    ${(v("c1") > m || v("ct1") > mt)
      ? "Your critical illness cover exceeds your mortgage balance and/or remaining term."
      : "Your critical illness cover matches your mortgage balance and remaining term."
    }
  </div>

  <div class="text-block">
    ${(v("c1") > m || v("ct1") > mt)
      ? "This means sufficient funds should be available to repay your mortgage following a valid claim, with cover to spare - worth reviewing, as right-sizing it could reduce your monthly premium."
      : "This means sufficient funds should be available to repay your mortgage following a valid critical illness claim."
    }
  </div>
  `;

}
  }

}


let overInsuranceText = "";

// Previously required BOTH the cover amount AND term to exceed the
// mortgage simultaneously for either Life or CIC - missing the much more
// common real-world case: someone remortgaging to a lower balance or
// shorter term (or downsizing) whose EXISTING cover now exceeds just one
// of those two, not both. A client reducing their mortgage by £50k but
// keeping the same life cover in place would previously trigger nothing
// at all here. Life and CIC are now checked independently, with wording
// that differentiates amount-only / term-only / both - and reframed as a
// genuine opportunity to right-size cover and potentially reduce the
// premium, not just a generic "worth reviewing" note.
if(document.getElementById("hasMortgage")?.value !== "no"){

  let overInsuranceParts = [];

  let lifeAmountOver = v("l1") > m;
  let lifeTermOver = v("lt1") > mt;

  if(lifeAmountOver || lifeTermOver){
    let detail;
    if(lifeAmountOver && lifeTermOver){
      detail = "Your life cover is higher than your current mortgage balance and runs for longer than your remaining mortgage term.";
    } else if(lifeAmountOver){
      detail = "Your life cover is higher than your current mortgage balance.";
    } else {
      detail = "Your life cover runs for longer than your remaining mortgage term.";
    }
    overInsuranceParts.push(`
      <div class="text-block sectionDivider">
        <b>• Life Cover Above Current Mortgage Requirements</b>
      </div>
      <div class="text-block">
        ${detail} This is a genuine opportunity to review your cover - right-sizing it to your current mortgage could reduce your monthly premium.
      </div>
    `);
  }

  let ciAmountOver = v("c1") > m;
  let ciTermOver = v("ct1") > mt;

  if(ciAmountOver || ciTermOver){
    let detail;
    if(ciAmountOver && ciTermOver){
      detail = "Your critical illness cover is higher than your current mortgage balance and runs for longer than your remaining mortgage term.";
    } else if(ciAmountOver){
      detail = "Your critical illness cover is higher than your current mortgage balance.";
    } else {
      detail = "Your critical illness cover runs for longer than your remaining mortgage term.";
    }
    overInsuranceParts.push(`
      <div class="text-block sectionDivider">
        <b>• Critical Illness Cover Above Current Mortgage Requirements</b>
      </div>
      <div class="text-block">
        ${detail} This is a genuine opportunity to review your cover - right-sizing it to your current mortgage could reduce your monthly premium.
      </div>
    `);
  }

  if(overInsuranceParts.length){
    overInsuranceText = overInsuranceParts.join("") + `
      <div class="text-block">
        At ${BRAND.companyName}, we offer free protection reviews - this could be a good time to make sure your cover still matches your circumstances.
      </div>
    `;
  }

}

let shortfall = Math.max(v("e1") - ip, 0);

let survivalMonths = shortfall > 0 && savings > 0
  ? savings / (v("e1") - ip || 1)
  : 0;

let lifestyleMonthsEF = v("s1") / (v("e1") || 1);
let reducedMonthsEF = v("s1") / (adjustedSpending || 1);

let noMortgageProtectionHTML = "";

if(document.getElementById("hasMortgage")?.value === "no"){

  noMortgageProtectionHTML = `
  <div class="text-block sectionDivider">
    <b>• Life Cover</b>
  </div>

  <div class="text-block">
    Life cover has not been included in your resilience score because this assessment focuses on mortgage protection needs.
  </div>

  <div class="text-block">
    A separate review may still be appropriate if you would like to provide financial support for dependants or leave assets to others.
  </div>

  <div class="text-block sectionDivider">
    <b>• Critical Illness Cover</b>
  </div>

  <div class="text-block">
    No mortgage has been identified, so critical illness cover has not been included in your resilience score.
  </div>
  `;
}

let incomeLossText = isWorking
  ? "if your income stopped"
  : "if your financial situation changed";

let incomeLossShort = isWorking
  ? "your income stops"
  : "your financial situation changes";


let efExplanation = "";

let impactHTML = "";

let noMortgageNote = "";

if(document.getElementById("hasMortgage")?.value === "no"){
  noMortgageNote = isWorking
    ? `
    <br><br>
    <b>You do not currently have a mortgage, so your resilience is based on your income protection and your financial buffer.</b>
    `
    : `
    <br><br>
    <b>You do not currently have a mortgage, so your resilience is based on your financial buffer.</b>
    `;
}

let fullLife =
  document.getElementById("dep")?.value === "no" ||
  (v("l1") >= m && lifeTerm === 0);

let fullCI =
  (v("c1") >= m && ciTerm === 0);


  let hasIPGap =
  trueShortfall > 0 || ipTermGap > 0;


if(unusableIP){
  
impactHTML = `
 
${ipIntroBlock}
 
 
<b>${
  tone === "urgent"
    ? namePrefix + "your income protection is unlikely to support you when it is needed most."
    : namePrefix + "your income protection may not provide immediate financial support."
}</b>
<br><br>
 
Although you have income protection in place, your deferred period means payments would not begin for approximately <b>${gapMonths.toFixed(1)} months</b>.<br><br>
 
Based on your current savings of <b>£${fmt(v("s1"))}</b>, this gap may not be fully covered, meaning you could still face financial pressure before your policy begins to pay out.<br><br>
 
<div class="text-block">
This reduces the practical value of your income protection, as support, may not be available when it is needed most.
</div>
 

<div class="text-block">
${dependencyMessageIP}
</div>

${needsEmergencyPlan ? emergencyPlanHTML : ""}

${overInsuranceText}
`;
}

else if(partiallyUsableIP){

impactHTML = `
 
${ipIntroBlock}
 
 
<b>${
  tone === "strong"
    ? namePrefix + "your income protection is well structured, but relies on a relatively tight short-term buffer."
    : tone === "balanced"
    ? namePrefix + "your income protection is in place, but relies on a narrow financial buffer."
    : namePrefix + "your income protection may leave you exposed during the early stages of an income loss."
}</b>
<br><br>
 
 
${
  tone === "strong"
    ? "Your savings are sufficient to bridge the gap before your policy begins to pay, although the margin for error is limited."
    : tone === "balanced"
    ? "While your savings could cover the gap before your policy begins to pay, this coverage is limited and leaves little room for unexpected costs, timing delays or changes in spending."
    : "Even though your savings may cover the initial gap, this position leaves little room for error if circumstances change."
}
<br><br>
 
In practice, this means your financial stability during this period would depend on everything working exactly as expected - including timing, spending discipline and no additional pressures.<br><br>
 

<div class="text-block">
${dependencyMessageIP}
</div>

${needsEmergencyPlan ? emergencyPlanHTML : ""}

${overInsuranceText}
`;
}

else if(
  fullIP &&
  fullLife &&
  fullCI &&
  monthsEF >= 3
){

impactHTML = `
 
${ipIntroBlock}
 
 
<b>${
  tone === "strong"
    ? namePrefix + "your overall financial resilience is strong, although there may still be opportunities to strengthen certain areas."
    : tone === "balanced"
    ? namePrefix + "you are in a solid and well-protected financial position."
    : namePrefix + "you have a structured financial setup, although some areas could be strengthened."
}</b>
<br><br>

${isWorking
  ? `Your income protection is aligned with the maximum available benefit and is structured through to retirement age, providing a stronger buffer against future increases in living costs, mortgage costs and other financial commitments.`
  : `Your financial position shows strong resilience based on your savings, spending and existing protection.`
}

<br><br>
 
You also have sufficient savings in place to provide a meaningful financial buffer, reducing reliance on immediate changes.

${protectionHTML}
${efSummaryHTML}
${noMortgageProtectionHTML}
${overInsuranceText}

${needsEmergencyPlan ? emergencyPlanHTML : ""}

<div class="text-block">
  This combination of savings, spending flexibility and protection provides a strong level of financial resilience based on the information you have entered.
</div>
 
<div class="text-block">
  ${efExplanation}
</div>
 
`;
}



else if(
  adequateIP &&
  ipTermGap === 0
){

impactHTML = `

${ipIntroBlock}

<div class="text-block">
  ${namePrefix}your current income protection covers your spending today, but is below the maximum level of protection available to you.
</div>

<div class="text-block">
  ${
    isWorking
      ? "If your income stopped today, you would not face an immediate financial shortfall"
      : "If your financial situation changes, you would not face an immediate financial shortfall"
  }, however your cover is below the maximum benefit available and may become less effective over time as living costs, mortgage costs and other commitments increase.
</div>

<div class="text-block">
  While your current cover broadly matches your expenditure today, inflation and future changes in financial commitments can gradually reduce the protection it provides.
</div>

<div class="text-block">
  Increasing cover closer to the maximum available benefit can provide additional long-term resilience and reduce the likelihood of future shortfalls.
</div>
 
Based on your current spending, your savings of <b>£${fmt(savings)}</b> would last approximately 
<b>${(savings / (v("e1") || 1)).toFixed(1)} months</b> if you made no changes.<br><br>
 
However, this relies on maintaining your full lifestyle without adjustment, which may not be sustainable over time.<br><br>
 
If you applied the spending reductions you selected, your savings would last approximately 
<b>${(savings / (adjustedSpending || 1)).toFixed(1)} months</b>.<br><br>
 
${needsEmergencyPlan ? emergencyPlanHTML : ""}

${protectionHTML}
${efSummaryHTML}
${noMortgageProtectionHTML}
${overInsuranceText}
 
<div class="text-block">
  ${efExplanation}
</div>
 
`;

}

else if(ip < v("e1") && hasStrongSavings){

impactHTML = `

${ipIntroBlock}

${needsEmergencyPlan ? emergencyPlanHTML : ""}

${protectionHTML}

${efSummaryHTML}

${noMortgageProtectionHTML}
${overInsuranceText}

<div class="text-block">
  ${efExplanation}
</div>

`;

}

else{

let lifestyleShortfall = Math.max(v("e1") - ip, 0);
let reducedShortfall = Math.max(base.adjustedSpending - ip, 0);

let lifestyleMonths =
  lifestyleShortfall > 0
    ? savings / lifestyleShortfall
    : null;

let reducedMonths =
  reducedShortfall > 0
    ? savings / reducedShortfall
    : null;


impactHTML = `
 
${ipIntroBlock}
 

${
  lifestyleShortfall > 0
  ? `
  <div class="text-block">
    Based on your current level of spending, you would face a shortfall of
    <b>£${fmt(lifestyleShortfall)}</b> per month.
  </div>

  <div class="text-block">
    While your savings may provide some short-term support, this gap would need to be addressed to maintain financial stability.
  </div>
  `
  : `
  <div class="text-block">
    Your income protection currently meets or exceeds your monthly spending requirements.
  </div>

  <div class="text-block">
    This means there is no immediate monthly income shortfall if your income stopped.
  </div>
  `
}

 ${
  savings === 0
  ? `
  <div class="text-block">
    <b>You do not currently have savings available to absorb this gap.</b>
  </div>
  `
  : lifestyleShortfall > 0
  ? `
  <div class="text-block">
    At this level, your savings of £${fmt(savings)} would last approximately
    <b>${lifestyleMonths.toFixed(1)} months</b>.
  </div>
  `
  : ``
}

 
${
  savings > 0 && reducedShortfall > 0 && hasReductions
  ? `
  <div class="text-block">
    Even if you made all your planned cutbacks, your savings would only last 
    <b>${reducedMonths.toFixed(1)} months</b>.
  </div>
  `
  : ""
}
 

${needsEmergencyPlan ? emergencyPlanHTML : ""}

${
  ip > 0
    ? ((ip1.max - ip) > 1
        ? ``
        : `

Your income protection already matches the maximum available benefit.

`)
    : `
You do not currently have any income protection in place.
 
Based on your income, you could access up to £${fmt(ip1.max)} per month.
`
}

${protectionHTML}
${efSummaryHTML}
${noMortgageProtectionHTML}
${overInsuranceText}

<div class="text-block">
  ${efExplanation}
</div>

 
`;

}

if(!isWorking){
  impactHTML += `
  <div class="text-block sectionDivider">
    <b>• Income Protection</b>
  </div>

  <div class="text-block">
    Income protection has not been included in this analysis as you are not currently earning an income.
  </div>
  `;
}
  

  // meaningHTML ("What This Means for You") is no longer appended here -
  // it's already its own self-contained .box, and analysis.meaningHTML is
  // available directly to renderResults(), so it's added there as a
  // sibling box rather than nested inside this one. Keeps each box a
  // reasonable, page-fitting size instead of one giant merged block.
  return impactHTML + noMortgageNote;
}


function generateOpportunity(analysis){

  let upliftHTML = buildUplift({
    currentScore: analysis.base.currentScore,
    improvedScore: analysis.base.improvedScore,
    lifeImprovedScore: analysis.base.lifeImprovedScore,
    ciImprovedScore: analysis.base.ciImprovedScore
  });

  let opportunityHTML = buildOpportunityBox();

  return { upliftHTML, opportunityHTML };
}


function generateProtectionReport(analysis){
  return analysis.base.bodyHTML;
}


function generateInputSummary(analysis){

  let fullName = analysis.fullName;

let fullInputSummaryHTML = `
<h3 class="section-title" id="budgetBreakdownHeading">Budget Breakdown</h3>
`;

document.querySelectorAll("h5[data-section]").forEach(section => {

  let sectionName = section.innerText;
  let sectionDiv = document.getElementById(section.getAttribute("data-section"));

  let lines = [];

  sectionDiv.querySelectorAll(".exp").forEach(e => {

    let label = e.querySelector("label")?.innerText || "";
    let amount = 0;

    e.querySelectorAll(".amt").forEach(input => {
      amount += num(input.value);
    });


if(
  amount <= 0 ||
  !label
) return;

    let type = e.querySelector(".on")?.innerText || "Non-essential";

    let line = `${label}: £${fmt(amount)} (${type})`;

    if(type === "Flexible"){
      let r = e.querySelector('input[type="range"]');
      let pct = r ? r.value : 100;
      let reduced = amount * (pct / 100);

      line = `${label}: £${fmt(amount)} (Flexible → £${fmt(reduced)})`;
    }

    if(type === "Non-essential"){
      line = `${label}: £${fmt(amount)} (Removed → £0)`;
    }

    lines.push(line);

  });


if(lines.length > 0){
  fullInputSummaryHTML += `
    <div class="box">
 
      <div class="text-block">
        <b>${sectionName}</b>
      </div>
 
      <div class="text-block">
        ${lines.join("<br>")}
      </div>
 
    </div>
  `;
}


});
  

fullInputSummaryHTML += `
<div class="box">
 
<div class="text-block">
  <b>Personal Details</b>
</div>
 
<div class="text-block">
  Name: ${fullName || "Not provided"}<br>
  Age: ${v("a1")}<br>
  Retirement Age: ${v("r1")}<br>
  Dependents: ${document.getElementById("dep")?.value}<br>
  Mortgage: ${document.getElementById("hasMortgage")?.value === "yes" ? "Yes" : "No"}
</div>
 
</div>
`;


fullInputSummaryHTML += `
<div class="box">
 
<div class="text-block">
  <b>Income & Savings</b>
</div>
 
<div class="text-block">
  Gross Income: £${fmt(v("g1"))}<br>
  Net Monthly Income: £${fmt(v("n1"))}<br>
  Total Savings: £${fmt(v("s1"))}
</div>
 
</div>
`;

if(document.getElementById("hasMortgage")?.value === "yes"){

fullInputSummaryHTML += `
<div class="box">
 
<div class="text-block">
  <b>Mortgage</b>
</div>
 
<div class="text-block">
  Balance: £${fmt(v("m"))}<br>
  Remaining Term: ${v("mt")} years
</div>
 
</div>
`;
}


fullInputSummaryHTML += `
<div class="box">

<div class="text-block">
  <b>Protection</b>
</div>

<div class="text-block">

${
  v("ip1") > 0
  ? `
  Income Protection: £${fmt(v("ip1"))}<br>
  Ends at Age: ${v("ipe") || "Retirement"}<br>
  Claim Period: ${document.getElementById("ipClaim")?.value || "Not specified"}<br>
  Deferred Period: ${v("d1")} weeks<br>
  Sick Pay: ${v("sp1")} weeks<br>
  Income Protection Premium: £${fmt(v("ipPremium"))}/month
  `
  : (document.getElementById("hasMortgage")?.value === "yes"
      ? `No income protection in place`
      : `No existing protection in place`
    )
}

${
  document.getElementById("hasMortgage")?.value === "yes"
  ? `
  <br>
  Life Cover: £${fmt(v("l1"))}<br>
  Life Term: ${v("lt1")} years<br>
  Critical Illness: £${fmt(v("c1"))}<br>
  Critical Illness Term: ${v("ct1")} years<br>
  ${
    document.getElementById("lifeCicSelection")?.value === "both_combined"
    ? `Combined Life and Critical Illness Premium: £${fmt(v("combinedPremium"))}/month`
    : `${v("l1") > 0 ? `Life Cover Premium: £${fmt(v("lifePremium"))}/month<br>` : ""}${v("c1") > 0 ? `Critical Illness Premium: £${fmt(v("ciPremium"))}/month` : ""}`
  }
  `
  : ""
}

</div>

</div>
`;


  return fullInputSummaryHTML;
}


function renderResults(analysis, options){
  options = options || {};

  if(analysis.status === "incomplete"){
    document.getElementById("scoreBox").innerHTML = "";
    document.getElementById("out").innerHTML = `
    <div class="box" style="border:2px solid #e67e22;background:#fff8f2;">
      ${analysis.message}
    </div>
    <div style="text-align:center;margin-top:20px;">
      <button onclick="goToStep(8)" class="btn-secondary">Back to Edit Details</button>
    </div>
    `;
    goToStep("resultsPage");
    return;
  }

  if(analysis.status === "error"){
    showMessage(analysis.message);
    let outEl = document.getElementById("out");
    if(outEl){
      outEl.innerHTML += `
      <div style="text-align:center;margin-top:20px;">
        <button onclick="goToStep(8)" class="btn-secondary">Back to Edit Details</button>
      </div>
      `;
    }
    goToStep("resultsPage");
    return;
  }

  if(analysis.status === "plannerIncomplete"){
    document.getElementById("scoreBox").innerHTML = analysis.base.riskHTML;
    document.getElementById("out").innerHTML = `
    <div class="box" style="border:2px solid #e67e22;background:#fff8f2;">
      ${analysis.message}
    </div>
    <div style="text-align:center;margin-top:20px;">
      <button onclick="goToStep(8)" class="btn-secondary">Back to Edit Details</button>
    </div>
    `;
    goToStep("resultsPage");
    return;
  }

  let base = analysis.base;
  let summaryTitle = analysis.summaryTitle;

  // Calculator-mode results are exploration-only - nothing here is saved,
  // and none of the client-facing actions (downloading/emailing a report,
  // booking a consultation, or "Edit Details" which would actually exit
  // the calculator and drop into the real Step 8) make sense on a screen
  // built from hypothetical numbers rather than the client's real answers.
  let isCalcMode = !!options.showTryAgainButton;

  let summaryHTML = generateSummary(analysis);
  let opportunity = generateOpportunity(analysis);
  let protectionReportHTML = generateProtectionReport(analysis);
  let inputSummaryHTML = generateInputSummary(analysis);

document.getElementById("scoreBox").innerHTML = base.riskHTML;

document.getElementById("out").innerHTML = `
<div class="fade-in">

<div class="box summary-box" style="border:2px solid ${base.rc.c};">
   
<div style="
  text-align:center;
  font-size:24px;
  font-weight:700;
  margin-bottom:20px;
  color:var(--primary-colour);
">
  ${summaryTitle}
</div>

 
 
${summaryHTML}

<div style="margin-top:15px;"></div>

${!isCalcMode ? `
<div style="
  display:flex;
  gap:10px;
  margin-bottom:15px;
">

  <button
    onclick="goToStep(8)"
    class="btn-secondary"
    style="flex:1;"
  >
    Edit Details
  </button>

</div>
` : ""}

 </div>


${analysis.meaningHTML}


${opportunity.upliftHTML}


${opportunity.opportunityHTML}


${!isCalcMode ? `
<div style="text-align:center;margin-top:20px;margin-bottom:15px;">
  <button onclick="bookConsultation()" class="btn">
    Speak to ${BRAND.adviserName}
  </button>
</div>
` : ""}


<div style="margin-top:15px;"></div>

<h3 class="section-title" id="protectionAnalysisHeading">Your Protection Analysis</h3>

${protectionReportHTML}

 

${!isCalcMode ? `
<div style="
  display:flex;
  gap:10px;
  margin-top:25px;
">

  <button
    onclick="goToStep(8)"
    class="btn-secondary"
    style="flex:1;"
  >
    Edit Details
  </button>

 
</div>
` : ""}

 
 
${inputSummaryHTML}
 
 

${!isCalcMode ? `
<div style="text-align:center;margin-top:30px;">
  <button onclick="bookConsultation()" class="btn">
    Book a Review with ${BRAND.adviserName}
  </button>
</div>
` : ""}

 
</div>
`;
 
 
setTimeout(() => {
  try {
    animateRiskScore();
  } catch(e) {
    console.warn("Animation failed:", e);
  }
}, 100);  

let pdfBtnEl = document.getElementById("pdfBtn");
let bookConsultBtnEl = document.getElementById("bookConsultBtn");
let tryAgainBtnEl = document.getElementById("tryAgainBtn");

if(isCalcMode){
  if(pdfBtnEl) pdfBtnEl.style.display = "none";
  if(bookConsultBtnEl) bookConsultBtnEl.style.display = "none";
  if(tryAgainBtnEl) tryAgainBtnEl.style.display = "block";
} else {
  if(pdfBtnEl) pdfBtnEl.style.display = "block";
  if(bookConsultBtnEl) bookConsultBtnEl.style.display = "block";
  if(tryAgainBtnEl) tryAgainBtnEl.style.display = "none";
}

let reportTitle = document.getElementById("pdfReportTitle");

if(reportTitle){
  reportTitle.innerText =
    `${analysis.fullName}'s Financial Resilience Report`;
}

let adviserContactEl = document.getElementById("pdfAdviserContact");
if(adviserContactEl){
  let contactLines = [];
  if(BRAND.adviserName) contactLines.push(`<div><strong>Adviser Name:</strong> ${BRAND.adviserName}</div>`);
  if(BRAND.adviserEmail) contactLines.push(`<div><strong>Adviser Email Address:</strong> ${BRAND.adviserEmail}</div>`);
  if(BRAND.adviserPhone) contactLines.push(`<div><strong>Adviser Phone Number:</strong> ${BRAND.adviserPhone}</div>`);
  adviserContactEl.innerHTML = contactLines.length
    ? contactLines.join("")
    : "";
}

if(DEMO_MODE && !isCalcMode){
  showDemoConversionBannerEl();
}

goToStep("resultsPage");



}

function calc(){
  if(!validateStep(8)){
    return;
  }
  let analysis = generateAnalysis();
  renderResults(analysis);

  // Demo mode never persists a submission or triggers notification emails
  // - save-submission.js couples the Supabase insert AND both Resend email
  // triggers (client report + adviser notification) into one call, so
  // simply never invoking it here is enough to satisfy all three "skip"
  // requirements at once. The client still sees their score/report and can
  // still download the PDF via savePDF(), which is entirely independent
  // of this call.
  if(analysis.status === "ok" && !DEMO_MODE){
    saveSubmission(analysis).catch(err => {
      // Deliberately silent to the client — they already have their score
      // and can download the PDF regardless, and a technical save error
      // isn't something they can act on. Logged so it's still discoverable
      // via browser dev tools if ever investigated.
      console.error("Background save failed:", err);
    });
  }
}

// Shown throughout the demo journey (not just step 1) so it's clear at
// every step, not just the first, that nothing being entered is saved.
// Placed right after the scroll anchor so it's the first thing visible
// alongside the progress bar, without disrupting scrollToTopExact()'s
// existing scroll targets.
function showDemoBanner(){
  let anchor = document.getElementById("scrollAnchor");
  if(!anchor) return;

  let banner = document.createElement("div");
  banner.id = "demoBanner";
  banner.style.cssText = "text-align:center;background:#fffbea;border:2px solid var(--secondary-colour);color:#7a5c00;padding:10px 16px;border-radius:8px;margin-bottom:16px;font-size:13px;font-weight:600;";
  banner.textContent = "This is a live demo - nothing you enter is saved, and no emails will be sent.";
  anchor.insertAdjacentElement("afterend", banner);

  // Sits directly below the notice above, hidden until a score has
  // actually been generated. This is a persistent element toggled by
  // show/hideDemoConversionBannerEl() rather than re-injected into #out on
  // every render - anchoring it at the top of the page (below the yellow
  // notice) instead of between the score box and the report, which broke
  // the visual flow of the real client-facing content.
  let conversionBanner = document.createElement("div");
  conversionBanner.id = "demoConversionBanner";
  conversionBanner.style.display = "none";
  conversionBanner.innerHTML = buildDemoConversionBanner();
  banner.insertAdjacentElement("afterend", conversionBanner);
}

function showDemoConversionBannerEl(){
  let el = document.getElementById("demoConversionBanner");
  if(el) el.style.display = "block";
}

function hideDemoConversionBannerEl(){
  let el = document.getElementById("demoConversionBanner");
  if(el) el.style.display = "none";
}

// Deliberately light grey/blue rather than the gold used for the "this is
// a demo" notice above it - that colour is reserved for the disclaimer,
// this is a distinct call to action and shouldn't be mistaken for more of
// the same message. Links straight to signup, not a pricing page, so the
// pricing detail lives in the banner text itself rather than adding an
// extra click before someone can start a trial.
function buildDemoConversionBanner(){
  return `
    <div style="text-align:center;background:#f0f4f8;border:2px solid #cfd9e4;border-radius:8px;padding:16px;margin-bottom:16px;">
      <div style="font-weight:700;font-size:16px;color:var(--primary-colour);margin-bottom:6px;">
        🎯 Like what you see?
      </div>
      <div style="font-size:13px;color:#555;margin-bottom:8px;">
        This is exactly what your own clients would experience - score, personalised report, CTA buttons.
      </div>
      <div style="font-size:12px;color:#555;margin-bottom:14px;">
        £40/month covers up to 4 advisers - £10/month for each additional adviser.
      </div>
      <a href="https://app.resiliencetool.co.uk/signup.html" style="display:inline-block;background:var(--primary-colour);color:#fff;padding:10px 22px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
        Start Your Free 14 Day Trial →
      </a>
    </div>
  `;
}

function initApp(){

  renderExpenseSections();

  if(DEMO_MODE){
    showDemoBanner();

    // Name/email capture stays in the journey - a prospect experiencing
    // exactly the same steps their own future clients would see is the
    // whole point of a self-serve demo. The placeholder just makes it
    // obvious nothing typed here goes anywhere, since nothing else on the
    // page says so at that specific step.
    let emailInput = document.getElementById("clientEmail");
    if(emailInput) emailInput.placeholder = "you@example.com (nothing will be sent)";
  }

  document.getElementById("calcBtn")?.addEventListener("click", calc);
  document.getElementById("pdfBtn")?.addEventListener("click", savePDF);

  // Short-term adviser delegation - only relevant for a shared-inbox embed
  // (e.g. info@). Populates the dropdown from the advisers loaded in
  // loadBrandFromSupabase(), and reveals the field only in that case -
  // every normal personal adviser link never shows this at all.
  function applyChosenAdviserToBrand(){
    let chosenAdviserSelect = document.getElementById("chosenAdviserId");
    if(!chosenAdviserSelect) return;

    let selectedId = chosenAdviserSelect.value;
    if(!selectedId){
      // "No preference" - BRAND simply keeps its original shared-inbox
      // details, exactly as if this field didn't exist.
      return;
    }

    let chosen = SHARED_INBOX_ADVISERS.find(a => String(a.id) === selectedId);
    if(!chosen) return;

    BRAND.adviserId = chosen.id;
    BRAND.adviserName = chosen.adviser_name;
    BRAND.adviserEmail = chosen.adviser_email;
    BRAND.adviserPhone = chosen.adviser_phone || "";
    BRAND.bookingUrl = chosen.booking_url;
  }

  if(BRAND.isSharedInbox && SHARED_INBOX_ADVISERS.length){
    let chosenAdviserRow = document.getElementById("chosenAdviserRow");
    let chosenAdviserSelect = document.getElementById("chosenAdviserId");

    if(chosenAdviserRow && chosenAdviserSelect){
      chosenAdviserRow.style.display = "block";

      SHARED_INBOX_ADVISERS.forEach(adviser => {
        let opt = document.createElement("option");
        opt.value = adviser.id;
        opt.textContent = adviser.adviser_name;
        chosenAdviserSelect.appendChild(opt);
      });

      chosenAdviserSelect.addEventListener("change", applyChosenAdviserToBrand);
    }
  }

  document.getElementById("isWorking")?.addEventListener("change", toggleIncomeFields);
  document.getElementById("isWorking")?.addEventListener("change", toggleSickPay);
  document.getElementById("dep")?.addEventListener("change", toggleChildcare);
  document.getElementById("dep")?.addEventListener("change", toggleLifeCover);
  document.getElementById("hasMortgage")?.addEventListener("change", toggleLifeCover);
  document.getElementById("hasProtection")?.addEventListener("change", toggleProtectionFields);
  document.getElementById("lifeCicSelection")?.addEventListener("change", updateLifeCicFieldsFromSelection);

  loadProgress();

  // Restoring earlier progress sets the dropdown's value directly, which
  // doesn't fire a "change" event - without this explicit call, a returning
  // client would see their earlier adviser choice still shown on screen,
  // while BRAND silently reverted to the shared inbox's own details behind
  // the scenes, sending their submission to the wrong place.
  if(BRAND.isSharedInbox){
    applyChosenAdviserToBrand();
  }

  if(MODEL_UPDATE){
    enterSilentModelUpdateMode();
  } else if(CALCULATOR_MODE){
    enterCalculatorMode();
  }

  toggleChildcare();
  toggleLifeCover();
  toggleIncomeFields();
  toggleProtectionFields();
  updateLifeCicFieldsFromSelection();
  toggleSickPay();

  updateDeferredBanner();
  
// Delays real user interaction being recognised until shortly after the
// page has finished loading - guards the focus-triggered scroll below
// against firing as a side effect of page/iframe initialisation itself
// (e.g. browser autofill touching a field, or an iframe becoming the
// page's active element on load), rather than a genuine tap/click from
// the client. Browsers can auto-scroll an ancestor page to bring a
// newly-focused iframe descendant into view - unlike scrollIntoView()
// itself, that specific behaviour does cross the iframe boundary, so an
// unguarded early focus event here was a plausible cause of the page
// jumping straight to the embed on load, skipping content above it.
let widgetReadyForInteraction = false;
setTimeout(() => { widgetReadyForInteraction = true; }, 800);

document.querySelectorAll("input").forEach(el => {
    el.addEventListener("focus", () => {
      if(!widgetReadyForInteraction) return;
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    });
  });

  document.querySelectorAll("input").forEach(i => {
    i.addEventListener("blur", () => {

      if(
        i.id === "clientName" ||
	i.id === "clientEmail" ||
        (i.type === "text" && i.closest("#step1"))
      ){
        return;
      }

      let val = num(i.value);

      if(i.value !== "" && !isNaN(val)){
        i.value = val.toLocaleString();
      }

    });
  });

}

async function initWhenReady(){
  if(!document.getElementById("calcBtn")){
    setTimeout(initWhenReady, 100);
    return;
  }
  checkForModelUpdate();
  await loadBrandFromSupabase();
  document.documentElement.style.setProperty("--primary-colour", BRAND.primaryColour);
  document.documentElement.style.setProperty("--secondary-colour", BRAND.secondaryColour);
let logoContainer = document.getElementById("companyLogo");
if(logoContainer && BRAND.logoUrl){
  logoContainer.innerHTML = `<img src="${BRAND.logoUrl}" style="max-height:90px;max-width:280px;">`;
} else if(logoContainer){
  logoContainer.style.display = "none";
}
let introText = document.getElementById("introText");
if(introText){
  if(!BRAND.logoUrl){
    introText.style.marginTop = "24px";
  }
  introText.innerHTML = `
<h2 style="margin:0 0 14px; color:#000; font-size:20px; text-align:center;">Get Your Financial Resilience Score with ${BRAND.companyName}</h2>
    <p style="margin:0 0 12px;">This short assessment takes around 5 minutes to complete and will show you how financially resilient you are if the unexpected happened. At the end, you'll receive a free, personalised summary you can download and the option to book a consultation with ${BRAND.adviserName}.</p>
    <p style="margin:0 0 12px;">If you have joint expenses with someone else, just input your share of those expenses.</p>
    <p style="margin:0 0 12px;">You can categorise your expenses as <b>"Essential"</b> meaning it's compulsory, <b>"Non-Essential"</b> meaning you're happy to give it up completely, or as <b>"Flexible"</b> which gives you the option to decrease your spending in a certain area where you would be happy to make cutbacks.</p>
    <p style="margin:0;">At the end of the assessment you will receive a score out of 100 and see which areas you score well in, which areas need addressing, and how you can improve your score. Your progress is saved automatically as you go along, so you can return to this later if you're in a rush or need to find some information to help you complete it (leave the tab open on your phone/computer to avoid your progress being deleted).</p>
  `;
}
  initApp();
}
  
initWhenReady();

window.goToStep = goToStep;
window.backFromProtection = backFromProtection;
window.clearProgress = clearProgress;
window.bookConsultation = bookConsultation;
window.backToCalculator = backToCalculator;

})();