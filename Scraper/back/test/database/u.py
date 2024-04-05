from bs4 import BeautifulSoup

def extract_symptoms(html_content):
    symptoms_list = []
    soup = BeautifulSoup(html_content, 'html.parser')
    symptoms_sections = soup.find_all('dt', string='Symptoms and signs')
    for section in symptoms_sections:
        symptoms = section.find_next_sibling('dd').find_all('strong')
        for symptom in symptoms:
            symptoms_list.append(symptom.get_text())
    return symptoms_list



def extract_symptoms_and_signs(html_content):

    soup = BeautifulSoup(html_content, 'html.parser')
    symptoms_and_signs = soup.find_all('dt', string='Symptoms and signs')
    authors = []
    for symptom in symptoms_and_signs:
        ul_tag = symptom.find_next_sibling('dd').find('ul')
        symptoms = ul_tag.find_all('a', href=True)
        for symptom in symptoms:
            if 'rel' in symptom.attrs and 'nofollow' in symptom.attrs['rel']:
                authors.append(symptom.text)
        ul_tag.decompose()
        symptom.decompose()
    return authors


def ext(html_content):
    symptoms_list = []
    soup = BeautifulSoup(html_content, 'html.parser')
    symptoms_and_signs = soup.find_all('dt', string='Symptoms and signs')
    for symptom in symptoms_and_signs:
        ul_tag = symptom.find_next_sibling('dd').find('ul')
        ul_tag.decompose()
        symptom.decompose()

    symptoms_sections = soup.find_all('dt')
    for section in symptoms_sections:
        symptoms = section.find_next_sibling('dd').find_all('strong')
        for symptom in symptoms:
            symptoms_list.append(symptom.get_text())
    return symptoms_list



# Example usage:
html_content = """
<div id="page_specific_content"><p><a href="ddb14367.htm" rel="nofollow"><strong>Abdominal pain</strong></a> may be caused by or feature of the following ... (sorted by category).</p>
You may also <a href="item_relationships.asp?glngUserChoice=14367&amp;bytRel=2&amp;blnBW=False&amp;strBB=RL&amp;Key={74507E19-02E3-4E70-8445-A5B234DA9BD1}" rel="nofollow">display items sorted alphabetically</a>.
Specific kinds of Abdominal pain were found and listed first. 
To expand them all click <a href="item_relationships.asp?glngUserChoice=14367&amp;bytRel=2&amp;strBW=0&amp;strBB=DD&amp;blnClassSort=1&amp;Key={74507E19-02E3-4E70-8445-A5B234DA9BD1}" rel="nofollow"> here</a><br><div style="position: absolute; top: -250px; left: -250px;"><a href="foo_new.asp?q=14367" rel="nofollow">_</a></div><br><dl><dt>Symptoms and signs</dt><dd><ul><li><a href="ddb4017.htm" rel="nofollow"><strong>Dysmenorrhoea</strong></a><br> (Specific kind of Abdominal pain) <a href="item_relationships.asp?glngUserChoice=4017&amp;bytRel=2&amp;blnBW=0&amp;strBB=RL&amp;blnClassSort=1" rel="nofollow">Shortcut to causes of Dysmenorrhoea</a></li>
</ul></dd>
<dt>Epiphenomena</dt><dd><ul><li><a href="ddb29528.htm" rel="nofollow"><strong>Sickle cell crisis (abdominal / sequestration)</strong></a></li>
<li><a href="ddb29529.htm" rel="nofollow"><strong>Sickle cell crisis (thrombotic)</strong></a></li>
</ul></dd>
<dt>Miscellaneous conditions</dt><dd><ul><li><a href="ddb34277.htm" rel="nofollow"><strong>Adrenal hemorrhage</strong></a></li>
<li><a href="ddb34588.htm" rel="nofollow"><strong>Celiac artery compression syndrome</strong></a></li>
<li><a href="ddb33385.htm" rel="nofollow"><strong>Choledocholithiasis</strong></a></li>
<li><a href="ddb33844.htm" rel="nofollow"><strong>Colitis cystica profunda</strong></a></li>
<li><a href="ddb10868.htm" rel="nofollow"><strong>Colonic pseudoobstruction</strong></a></li>
<li><a href="ddb32555.htm" rel="nofollow"><strong>Eosinophilic gastroenteritis</strong></a></li>
<li><a href="ddb9819.htm" rel="nofollow"><strong>Gastroduodenal ulcers</strong></a></li>
<li><a href="ddb30726.htm" rel="nofollow"><strong>Gastroenteritis</strong></a></li>
<li><a href="ddb34042.htm" rel="nofollow"><strong>Gastrointestinal perforation</strong></a></li>
<li><a href="ddb36509.htm" rel="nofollow"><strong>Hepatic veno-occlusive disease</strong></a></li>
<li><a href="ddb1353.htm" rel="nofollow"><strong>IgA nephropathy</strong></a></li>
<li><a href="ddb29034.htm" rel="nofollow"><strong>Intestinal ischaemia</strong></a></li>
<li><a href="ddb65224.htm" rel="nofollow"><strong>Loin pain haematuria syndrome</strong></a></li>
<li><a href="ddb29128.htm" rel="nofollow"><strong>Malakoplakia</strong></a></li>
<li><a href="ddb33067.htm" rel="nofollow"><strong>Mesenteric venous thrombosis</strong></a></li>
<li><a href="ddb2955.htm" rel="nofollow"><strong>Microscopic colitis</strong></a></li>
<li><a href="ddb32038.htm" rel="nofollow"><strong>Ovarian hyperstimulation syndrome</strong></a></li>
<li><a href="ddb9530.htm" rel="nofollow"><strong>Pancreatic pseudocyst</strong></a></li>
<li><a href="ddb6706.htm" rel="nofollow"><strong>Paralytic Ileus</strong></a></li>
<li><a href="ddb9688.htm" rel="nofollow"><strong>Paroxysmal nocturnal haemoglobinuria</strong></a></li>
<li><a href="ddb10141.htm" rel="nofollow"><strong>Pneumatosis cystoides intestinalis</strong></a></li>
<li><a href="ddb11445.htm" rel="nofollow"><strong>Retroperitoneal fibrosis</strong></a></li>
<li><a href="ddb11455.htm" rel="nofollow"><strong>Retroperitoneal haemorrhage</strong></a></li>
<li><a href="ddb30690.htm" rel="nofollow"><strong>Simple renal cyst</strong></a></li>
<li><a href="ddb12297.htm" rel="nofollow"><strong>Sphincter of Oddi dysfunction</strong></a></li>
</ul></dd>
<dt>Symptoms and signs</dt><dd><ul><li><a href="ddb3080.htm" rel="nofollow"><strong>Constipation</strong></a></li>
<li><a href="ddb23596.htm" rel="nofollow"><strong>Gastroesophageal reflux</strong></a></li>
<li><a href="ddb65131.htm" rel="nofollow"><strong>Intraperitoneal haemorrhage</strong></a></li>
<li><a href="ddb13582.htm" rel="nofollow"><strong>Urine retention</strong></a></li>
</ul></dd>
<dt>Biochemical abnormalities</dt><dd><ul><li><a href="ddb6196.htm" rel="nofollow"><strong>Hypercalcaemia</strong></a></li>
</ul></dd>
<dt>Histopathological abnormalities</dt><dd><ul><li><a href="ddb5245.htm" rel="nofollow"><strong>Glomerulonephritis</strong></a></li>
<li><a href="ddb9572.htm" rel="nofollow"><strong>Papillary necrosis</strong></a></li>
</ul></dd>
<dt>Congenital conditions</dt><dd><ul><li><a href="ddb32496.htm" rel="nofollow"><strong>Chilaiditi syndrome</strong></a></li>
<li><a href="ddb32367.htm" rel="nofollow"><strong>Nutcracker syndrome of left renal vein</strong></a></li>
<li><a href="ddb33272.htm" rel="nofollow"><strong>Wandering spleen</strong></a></li>
</ul></dd>
<dt>Chromosomal abnormalities</dt><dd><ul><li><a href="ddb3898.htm" rel="nofollow"><strong>Down syndrome</strong></a></li>
</ul></dd>
<dt>Mendelian inherited conditions</dt><dd><ul><li><a href="ddb4730.htm" rel="nofollow"><strong>Familial hypertriglyceridaemia</strong></a></li>
<li><a href="ddb5003.htm" rel="nofollow"><strong>Fructose-1-phosphate aldolase deficiency</strong></a></li>
<li><a href="ddb5490.htm" rel="nofollow"><strong>Haemochromatosis</strong></a></li>
<li><a href="ddb30161.htm" rel="nofollow"><strong>Hyperimmunoglobulinemia D and periodic fever syndrome</strong></a></li>
<li><a href="ddb7238.htm" rel="nofollow"><strong>Lactase deficiency</strong></a></li>
<li><a href="ddb12069.htm" rel="nofollow"><strong>Sickle cell disease</strong></a></li>
</ul></dd>
<dt>Autosomal dominant conditions</dt><dd><ul><li><a href="ddb171.htm" rel="nofollow"><strong>Acute intermittent porphyria</strong></a></li>
<li><a href="ddb1821.htm" rel="nofollow"><strong>C1 esterase inhibitor (C1-INH) deficiency</strong></a></li>
<li><a href="ddb31864.htm" rel="nofollow"><strong>Chester porphyria</strong></a></li>
<li><a href="ddb30591.htm" rel="nofollow"><strong>Coproporphyria, hereditary</strong></a></li>
<li><a href="ddb65319.htm" rel="nofollow"><strong>Hereditary alpha-tryptasemia syndrome</strong></a></li>
<li><a href="ddb30160.htm" rel="nofollow"><strong>Hibernian fever, familial</strong></a></li>
<li><a href="ddb30159.htm" rel="nofollow"><strong>Muckle-Wells syndrome</strong></a></li>
<li><a href="ddb10262.htm" rel="nofollow"><strong>Polycystic kidney disease, adult (autosomal dominant)</strong></a></li>
<li><a href="ddb13738.htm" rel="nofollow"><strong>Variegate porphyria</strong></a></li>
</ul></dd>
<dt>Autosomal recessive conditions</dt><dd><ul><li><a href="ddb870.htm" rel="nofollow"><strong>Apolipoprotein C-II deficiency</strong></a></li>
<li><a href="ddb3982.htm" rel="nofollow"><strong>Dubin-Johnson syndrome</strong></a></li>
<li><a href="ddb34722.htm" rel="nofollow"><strong>Estrogen dependent hereditary angioedema</strong></a></li>
<li><a href="ddb4697.htm" rel="nofollow"><strong>Lipoprotein lipase deficiency</strong></a></li>
<li><a href="ddb32948.htm" rel="nofollow"><strong>Myoneurogastrointestinal encephalopathy syndrome</strong></a></li>
<li><a href="ddb30592.htm" rel="nofollow"><strong>Porphobilinogen synthase deficiency</strong></a></li>
<li><a href="ddb9836.htm" rel="nofollow"><strong>Recurrent hereditary polyserositis</strong></a></li>
</ul></dd>
<dt>X-linked inherited conditions</dt><dd><ul><li><a href="ddb4638.htm" rel="nofollow"><strong>Fabry disease</strong></a></li>
</ul></dd>
<dt>Endocrine conditions</dt><dd><ul><li><a href="ddb6160.htm" rel="nofollow"><strong>Cushing syndrome</strong></a></li>
<li><a href="ddb3661.htm" rel="nofollow"><strong>Diabetes mellitus type 2</strong></a></li>
<li><a href="ddb3709.htm" rel="nofollow"><strong>Diabetic ketoacidosis</strong></a></li>
</ul></dd>
<dt>Cardiac and vascular conditions</dt><dd><ul><li><a href="ddb792.htm" rel="nofollow"><strong>Aortic aneurysm, abdominal</strong></a></li>
<li><a href="ddb18165.htm" rel="nofollow"><strong>Embolism</strong></a></li>
<li><a href="ddb1735.htm" rel="nofollow"><strong>Hepatic vein thrombosis</strong></a></li>
<li><a href="ddb6716.htm" rel="nofollow"><strong>Iliac artery aneurysm</strong></a></li>
<li><a href="ddb8695.htm" rel="nofollow"><strong>Ischaemic heart disease</strong></a></li>
<li><a href="ddb8207.htm" rel="nofollow"><strong>Migraine</strong></a></li>
<li><a href="ddb11337.htm" rel="nofollow"><strong>Renal infarction</strong></a></li>
<li><a href="ddb11359.htm" rel="nofollow"><strong>Renal vein thrombosis</strong></a></li>
<li><a href="ddb12365.htm" rel="nofollow"><strong>Splenic infarction</strong></a></li>
<li><a href="ddb12692.htm" rel="nofollow"><strong>Superior mesenteric artery occlusion</strong></a></li>
</ul></dd>
<dt>Immune mediated conditions</dt><dd><ul><li><a href="ddb31343.htm" rel="nofollow"><strong>Angioedema, acquired</strong></a></li>
</ul></dd>
<dt>Hypersensitivity reaction type 1</dt><dd><ul><li><a href="ddb65053.htm" rel="nofollow"><strong>Alpha-gal syndrome</strong></a></li>
</ul></dd>
<dt>Autoimmune conditions</dt><dd><ul><li><a href="ddb2685.htm" rel="nofollow"><strong>Churg-Strauss syndrome</strong></a></li>
<li><a href="ddb3178.htm" rel="nofollow"><strong>Crohn disease</strong></a></li>
<li><a href="ddb29425.htm" rel="nofollow"><strong>Degos' disease</strong></a></li>
<li><a href="ddb5705.htm" rel="nofollow"><strong>Immunoglobulin A vasculitis</strong></a></li>
<li><a href="ddb9679.htm" rel="nofollow"><strong>Paroxysmal cold haemoglobinuria</strong></a></li>
<li><a href="ddb10220.htm" rel="nofollow"><strong>Polyarteritis nodosa</strong></a></li>
<li><a href="ddb10643.htm" rel="nofollow"><strong>Primary sclerosing cholangitis</strong></a></li>
<li><a href="ddb13495.htm" rel="nofollow"><strong>Ulcerative colitis</strong></a></li>
</ul></dd>
<dt>Inflammatory conditions</dt><dd><ul><li><a href="ddb885.htm" rel="nofollow"><strong>Appendicitis</strong></a></li>
<li><a href="ddb2514.htm" rel="nofollow"><strong>Cholangitis</strong></a></li>
<li><a href="ddb3876.htm" rel="nofollow"><strong>Colonic diverticulitis</strong></a></li>
<li><a href="ddb3237.htm" rel="nofollow"><strong>Curling ulcers</strong></a></li>
<li><a href="ddb3259.htm" rel="nofollow"><strong>Cushing ulcers</strong></a></li>
<li><a href="ddb29445.htm" rel="nofollow"><strong>Cystitis</strong></a></li>
<li><a href="ddb4005.htm" rel="nofollow"><strong>Duodenal ulcer</strong></a></li>
<li><a href="ddb5115.htm" rel="nofollow"><strong>Gastric ulcer</strong></a></li>
<li><a href="ddb34500.htm" rel="nofollow"><strong>Gastritis</strong></a></li>
<li><a href="ddb7903.htm" rel="nofollow"><strong>Meckel diverticulitis</strong></a></li>
<li><a href="ddb8068.htm" rel="nofollow"><strong>Mesenteric adenitis</strong></a></li>
<li><a href="ddb9182.htm" rel="nofollow"><strong>Oesophagitis</strong></a></li>
<li><a href="ddb33068.htm" rel="nofollow"><strong>Osteitis pubis</strong></a></li>
<li><a href="ddb9539.htm" rel="nofollow"><strong>Pancreatitis, acute</strong></a></li>
<li><a href="ddb9559.htm" rel="nofollow"><strong>Pancreatitis, chronic</strong></a></li>
<li><a href="ddb32490.htm" rel="nofollow"><strong>Perihepatitis</strong></a></li>
<li><a href="ddb9860.htm" rel="nofollow"><strong>Peritonitis</strong></a></li>
<li><a href="ddb31510.htm" rel="nofollow"><strong>Phlegmonous gastritis</strong></a></li>
<li><a href="ddb10166.htm" rel="nofollow"><strong>Pneumonia</strong></a></li>
<li><a href="ddb27702.htm" rel="nofollow"><strong>Toxic megacolon</strong></a></li>
<li><a href="ddb31505.htm" rel="nofollow"><strong>Typhlitis</strong></a></li>
<li><a href="ddb31522.htm" rel="nofollow"><strong>Xanthogranulomatous pyelonephritis</strong></a></li>
</ul></dd>
<dt>Neoplastic conditions</dt><dd><ul><li><a href="ddb442.htm" rel="nofollow"><strong>Alpha heavy chain disease</strong></a></li>
<li><a href="ddb2040.htm" rel="nofollow"><strong>Carcinoid tumours and carcinoid syndrome</strong></a></li>
<li><a href="ddb65143.htm" rel="nofollow"><strong>Intraductal papillary mucinous pancreatic neoplasm</strong></a></li>
</ul></dd>
<dt>Benign neoplastic conditions</dt><dd><ul><li><a href="ddb29496.htm" rel="nofollow"><strong>Angiomyolipoma</strong></a></li>
<li><a href="ddb33456.htm" rel="nofollow"><strong>Renal oncocytoma</strong></a></li>
<li><a href="ddb14279.htm" rel="nofollow"><strong>Zollinger-Ellison syndrome</strong></a></li>
</ul></dd>
<dt>Malignant neoplastic conditions</dt><dd><ul><li><a href="ddb2505.htm" rel="nofollow"><strong>Cholangiocarcinoma</strong></a></li>
<li><a href="ddb2975.htm" rel="nofollow"><strong>Colorectal cancer</strong></a></li>
<li><a href="ddb7547.htm" rel="nofollow"><strong>Liver cancer, primary</strong></a></li>
<li><a href="ddb8896.htm" rel="nofollow"><strong>Nephroblastoma</strong></a></li>
<li><a href="ddb9418.htm" rel="nofollow"><strong>Ovarian cancer</strong></a></li>
<li><a href="ddb9510.htm" rel="nofollow"><strong>Pancreatic cancer</strong></a></li>
<li><a href="ddb12193.htm" rel="nofollow"><strong>Small bowel lymphoma</strong></a></li>
<li><a href="ddb12445.htm" rel="nofollow"><strong>Stomach cancer</strong></a></li>
</ul></dd>
<dt>Gynaecologic conditions</dt><dd><ul><li><a href="ddb4269.htm" rel="nofollow"><strong>Endometriosis</strong></a></li>
<li><a href="ddb8310.htm" rel="nofollow"><strong>Mittelschmerz</strong></a></li>
<li><a href="ddb9433.htm" rel="nofollow"><strong>Ovarian cyst</strong></a></li>
<li><a href="ddb9748.htm" rel="nofollow"><strong>Pelvic inflammatory disease</strong></a></li>
<li><a href="ddb10513.htm" rel="nofollow"><strong>Premenstrual syndrome</strong></a></li>
</ul></dd>
<dt>Obstetric conditions</dt><dd><ul><li><a href="ddb32873.htm" rel="nofollow"><strong>Braxton Hick contraction</strong></a></li>
<li><a href="ddb1631.htm" rel="nofollow"><strong>Breech presentation</strong></a></li>
<li><a href="ddb4089.htm" rel="nofollow"><strong>Ectopic pregnancy</strong></a></li>
<li><a href="ddb6884.htm" rel="nofollow"><strong>Intrahepatic cholestasis of pregnancy</strong></a></li>
<li><a href="ddb7236.htm" rel="nofollow"><strong>Labour (normal)</strong></a></li>
<li><a href="ddb29.htm" rel="nofollow"><strong>Miscarriage</strong></a></li>
<li><a href="ddb40.htm" rel="nofollow"><strong>Placental abruption</strong></a></li>
<li><a href="ddb4802.htm" rel="nofollow"><strong>Uterine fibroid red degeneration</strong></a></li>
<li><a href="ddb13642.htm" rel="nofollow"><strong>Uterine rupture</strong></a></li>
</ul></dd>
<dt>Psychiatric conditions</dt><dd><ul><li><a href="ddb1645.htm" rel="nofollow"><strong>Functional disorders</strong></a></li>
<li><a href="ddb30638.htm" rel="nofollow"><strong>Irritable bowel syndrome</strong></a></li>
</ul></dd>
<dt>Trauma, mechanical and physical conditions</dt><dd><ul><li><a href="ddb5227.htm" rel="nofollow"><strong>Acute angle-closure glaucoma</strong></a></li>
<li><a href="ddb1560.htm" rel="nofollow"><strong>Bowel strangulation</strong></a></li>
<li><a href="ddb2527.htm" rel="nofollow"><strong>Choledochal cyst</strong></a></li>
<li><a href="ddb2533.htm" rel="nofollow"><strong>Cholelithiasis</strong></a></li>
<li><a href="ddb4793.htm" rel="nofollow"><strong>Femoral hernia</strong></a></li>
<li><a href="ddb5075.htm" rel="nofollow"><strong>Gall bladder rupture</strong></a></li>
<li><a href="ddb32054.htm" rel="nofollow"><strong>Gastric volvulus</strong></a></li>
<li><a href="ddb5481.htm" rel="nofollow"><strong>Haematocolpos</strong></a></li>
<li><a href="ddb29597.htm" rel="nofollow"><strong>Haematometra</strong></a></li>
<li><a href="ddb29596.htm" rel="nofollow"><strong>Hematosalpinx</strong></a></li>
<li><a href="ddb6806.htm" rel="nofollow"><strong>Inguinal hernia</strong></a></li>
<li><a href="ddb13996.htm" rel="nofollow"><strong>Intestinal volvulus</strong></a></li>
<li><a href="ddb6913.htm" rel="nofollow"><strong>Intususception of intestine</strong></a></li>
<li><a href="ddb7255.htm" rel="nofollow"><strong>Large bowel obstruction</strong></a></li>
<li><a href="ddb7803.htm" rel="nofollow"><strong>Mallory-Weiss syndrome</strong></a></li>
<li><a href="ddb11346.htm" rel="nofollow"><strong>Nephrolithiasis</strong></a></li>
<li><a href="ddb29334.htm" rel="nofollow"><strong>Obturator hernia</strong></a></li>
<li><a href="ddb31120.htm" rel="nofollow"><strong>Ovarian torsion</strong></a></li>
<li><a href="ddb273.htm" rel="nofollow"><strong>Peritoneal adhesions</strong></a></li>
<li><a href="ddb11986.htm" rel="nofollow"><strong>Sexual abuse</strong></a></li>
<li><a href="ddb12205.htm" rel="nofollow"><strong>Small bowel obstruction</strong></a></li>
<li><a href="ddb12327.htm" rel="nofollow"><strong>Spinal cord injury, acute</strong></a></li>
<li><a href="ddb12369.htm" rel="nofollow"><strong>Splenic rupture</strong></a></li>
<li><a href="ddb32796.htm" rel="nofollow"><strong>Splenosis</strong></a></li>
<li><a href="ddb12984.htm" rel="nofollow"><strong>Testicular torsion</strong></a></li>
<li><a href="ddb34273.htm" rel="nofollow"><strong>Torsion of epididymis</strong></a></li>
</ul></dd>
<dt>Infection and infective conditions</dt><dd><ul><li><a href="ddb2520.htm" rel="nofollow"><strong>Cholecystitis</strong></a></li>
<li><a href="ddb29210.htm" rel="nofollow"><strong>Cystitis, infective</strong></a></li>
<li><a href="ddb30712.htm" rel="nofollow"><strong>Gallbladder empyema</strong></a></li>
<li><a href="ddb22094.htm" rel="nofollow"><strong>Liver abscess</strong></a></li>
<li><a href="ddb29255.htm" rel="nofollow"><strong>Pyelonephritis, acute</strong></a></li>
<li><a href="ddb12587.htm" rel="nofollow"><strong>Subdiaphragmatic abscess</strong></a></li>
<li><a href="ddb13657.htm" rel="nofollow"><strong>Urinary tract infection</strong></a></li>
</ul></dd>
<dt>Helminths and helminthic conditions</dt><dd><ul><li><a href="ddb34964.htm" rel="nofollow"><strong>Acanthocephaliasis</strong></a></li>
<li><a href="ddb690.htm" rel="nofollow"><strong>Ancylostoma caninum</strong></a></li>
<li><a href="ddb32147.htm" rel="nofollow"><strong>Anisakiasis</strong></a></li>
<li><a href="ddb934.htm" rel="nofollow"><strong>Ascariasis</strong></a></li>
<li><a href="ddb65307.htm" rel="nofollow"><strong>Capillaria intestinalis</strong></a></li>
<li><a href="ddb29302.htm" rel="nofollow"><strong>Clonorchiasis</strong></a></li>
<li><a href="ddb33228.htm" rel="nofollow"><strong>Cystic echinococcosis</strong></a></li>
<li><a href="ddb33576.htm" rel="nofollow"><strong>Dicrocoelium dendriticum fluke</strong></a></li>
<li><a href="ddb4757.htm" rel="nofollow"><strong>Fasciola hepatica</strong></a></li>
<li><a href="ddb33234.htm" rel="nofollow"><strong>Heterophyiasis</strong></a></li>
<li><a href="ddb65312.htm" rel="nofollow"><strong>Intestinal angiostrongyliasis</strong></a></li>
<li><a href="ddb33235.htm" rel="nofollow"><strong>Metagonimiasis</strong></a></li>
<li><a href="ddb34371.htm" rel="nofollow"><strong>Metorchiasis</strong></a></li>
<li><a href="ddb33303.htm" rel="nofollow"><strong>Oesophagostomiasis</strong></a></li>
<li><a href="ddb29303.htm" rel="nofollow"><strong>Opisthorchiasis</strong></a></li>
<li><a href="ddb30756.htm" rel="nofollow"><strong>Paragonimiasis</strong></a></li>
<li><a href="ddb12875.htm" rel="nofollow"><strong>Teniasis</strong></a></li>
<li><a href="ddb29739.htm" rel="nofollow"><strong>Toxocariasis</strong></a></li>
<li><a href="ddb34161.htm" rel="nofollow"><strong>Trichostrongyliasis</strong></a></li>
</ul></dd>
<dt>Protozoa and protozoal conditions</dt><dd><ul><li><a href="ddb33233.htm" rel="nofollow"><strong>Blastocystis hominis</strong></a></li>
<li><a href="ddb3221.htm" rel="nofollow"><strong>Cryptosporidiosis</strong></a></li>
<li><a href="ddb32407.htm" rel="nofollow"><strong>Dientamoeba fragilis</strong></a></li>
<li><a href="ddb4304.htm" rel="nofollow"><strong>Entamoeba histolytica</strong></a></li>
<li><a href="ddb7751.htm" rel="nofollow"><strong>Malaria (malignant tertian)</strong></a></li>
</ul></dd>
<dt>Bacteria and bacterial conditions</dt><dd><ul><li><a href="ddb12005.htm" rel="nofollow"><strong>Bacillary dysentery</strong></a></li>
<li><a href="ddb1914.htm" rel="nofollow"><strong>Campylobacter jejuni</strong></a></li>
<li><a href="ddb4843.htm" rel="nofollow"><strong>Fitz-Hugh Curtis syndrome</strong></a></li>
<li><a href="ddb29101.htm" rel="nofollow"><strong>Lymphogranuloma venereum</strong></a></li>
<li><a href="ddb11765.htm" rel="nofollow"><strong>Salmonella</strong></a></li>
<li><a href="ddb29061.htm" rel="nofollow"><strong>Tabes dorsalis</strong></a></li>
<li><a href="ddb27829.htm" rel="nofollow"><strong>Typhoid fever</strong></a></li>
<li><a href="ddb13854.htm" rel="nofollow"><strong>Vibrio parahaemolyticus</strong></a></li>
<li><a href="ddb14124.htm" rel="nofollow"><strong>Whipple disease</strong></a></li>
<li><a href="ddb14218.htm" rel="nofollow"><strong>Yersinia enterocolitica</strong></a></li>
</ul></dd>
<dt>Viruses and viral conditions</dt><dd><ul><li><a href="ddb29152.htm" rel="nofollow"><strong>Bornholm disease</strong></a></li>
<li><a href="ddb33772.htm" rel="nofollow"><strong>Chandipura virus</strong></a></li>
<li><a href="ddb34370.htm" rel="nofollow"><strong>Dobrava-Belgrade Virus</strong></a></li>
<li><a href="ddb29103.htm" rel="nofollow"><strong>Epstein-Barr virus</strong></a></li>
<li><a href="ddb5757.htm" rel="nofollow"><strong>Hepatitis A</strong></a></li>
<li><a href="ddb4387.htm" rel="nofollow"><strong>Infectious mononucleosis</strong></a></li>
<li><a href="ddb7272.htm" rel="nofollow"><strong>Lassa fever</strong></a></li>
<li><a href="ddb8449.htm" rel="nofollow"><strong>Mumps</strong></a></li>
<li><a href="ddb5868.htm" rel="nofollow"><strong>Varicella-zoster virus</strong></a></li>
<li><a href="ddb4033.htm" rel="nofollow"><strong>Viral haemorrhagic fever</strong></a></li>
</ul></dd>
<dt>Iatrogenic conditions</dt><dd><ul><li><a href="ddb1955.htm" rel="nofollow"><strong>Continuous ambulatory peritoneal dialysis</strong></a></li>
<li><a href="ddb29043.htm" rel="nofollow"><strong>Laparotomy</strong></a></li>
</ul></dd>
<dt>Chemicals</dt><dd><ul><li><a href="ddb907.htm" rel="nofollow"><strong>Arsenicals</strong></a></li>
<li><a href="ddb2020.htm" rel="nofollow"><strong>Carbon monoxide toxicity</strong></a></li>
<li><a href="ddb29121.htm" rel="nofollow"><strong>Carbon tetrachloride</strong></a></li>
<li><a href="ddb3101.htm" rel="nofollow"><strong>Copper salts</strong></a></li>
<li><a href="ddb7307.htm" rel="nofollow"><strong>Lead toxicity</strong></a></li>
<li><a href="ddb9271.htm" rel="nofollow"><strong>Organophosphates</strong></a></li>
<li><a href="ddb31123.htm" rel="nofollow"><strong>Poison hemlock</strong></a></li>
<li><a href="ddb31148.htm" rel="nofollow"><strong>Tetrodotoxin</strong></a></li>
<li><a href="ddb13009.htm" rel="nofollow"><strong>Thallium</strong></a></li>
<li><a href="ddb31125.htm" rel="nofollow"><strong>Water hemlock poisoning</strong></a></li>
<li><a href="ddb14260.htm" rel="nofollow"><strong>Zinc</strong></a></li>
</ul></dd>
<dt>Drug groups</dt><dd><ul><li><a href="ddb6959.htm" rel="nofollow"><strong>Iron compounds</strong></a></li>
</ul></dd>
<dt>Drugs, hormones and mediators</dt><dd><ul><li><a href="ddb30543.htm" rel="nofollow"><strong>Acipimox</strong></a></li>
<li><a href="ddb30080.htm" rel="nofollow"><strong>Alosetron</strong></a></li>
<li><a href="ddb34876.htm" rel="nofollow"><strong>Amifampridine</strong></a></li>
<li><a href="ddb33435.htm" rel="nofollow"><strong>Arsenic trioxide</strong></a></li>
<li><a href="ddb985.htm" rel="nofollow"><strong>Aspirin</strong></a></li>
<li><a href="ddb32771.htm" rel="nofollow"><strong>Atomoxetine</strong></a></li>
<li><a href="ddb60854.htm" rel="nofollow"><strong>Avapritinib</strong></a></li>
<li><a href="ddb1384.htm" rel="nofollow"><strong>Bethanechol</strong></a></li>
<li><a href="ddb35106.htm" rel="nofollow"><strong>Bosutinib</strong></a></li>
<li><a href="ddb2433.htm" rel="nofollow"><strong>Chloroquine</strong></a></li>
<li><a href="ddb2708.htm" rel="nofollow"><strong>Ciprofloxacin</strong></a></li>
<li><a href="ddb2760.htm" rel="nofollow"><strong>Cisapride</strong></a></li>
<li><a href="ddb2938.htm" rel="nofollow"><strong>Colchicine</strong></a></li>
<li><a href="ddb3809.htm" rel="nofollow"><strong>Digoxin</strong></a></li>
<li><a href="ddb35166.htm" rel="nofollow"><strong>Dimethyl fumarate</strong></a></li>
<li><a href="ddb36380.htm" rel="nofollow"><strong>Dinutuximab</strong></a></li>
<li><a href="ddb62921.htm" rel="nofollow"><strong>Diroximel fumarate</strong></a></li>
<li><a href="ddb32518.htm" rel="nofollow"><strong>Drospirenone</strong></a></li>
<li><a href="ddb36403.htm" rel="nofollow"><strong>Eluxadoline</strong></a></li>
<li><a href="ddb29785.htm" rel="nofollow"><strong>Entacapone</strong></a></li>
<li><a href="ddb4420.htm" rel="nofollow"><strong>Ergotamine</strong></a></li>
<li><a href="ddb325.htm" rel="nofollow"><strong>Ethanol</strong></a></li>
<li><a href="ddb32749.htm" rel="nofollow"><strong>Ezetimibe</strong></a></li>
<li><a href="ddb65220.htm" rel="nofollow"><strong>Fezolinetant</strong></a></li>
<li><a href="ddb5141.htm" rel="nofollow"><strong>Gemeprost</strong></a></li>
<li><a href="ddb30319.htm" rel="nofollow"><strong>Hydroxychloroquine</strong></a></li>
<li><a href="ddb6767.htm" rel="nofollow"><strong>Indomethacin</strong></a></li>
<li><a href="ddb36639.htm" rel="nofollow"><strong>Inotuzumab ozogamicin</strong></a></li>
<li><a href="ddb34748.htm" rel="nofollow"><strong>Lanatoside C</strong></a></li>
<li><a href="ddb33751.htm" rel="nofollow"><strong>Lapatinib ditosylate</strong></a></li>
<li><a href="ddb34376.htm" rel="nofollow"><strong>Lisdexamfetamine</strong></a></li>
<li><a href="ddb29740.htm" rel="nofollow"><strong>Melarsoprol</strong></a></li>
<li><a href="ddb8152.htm" rel="nofollow"><strong>Methysergide</strong></a></li>
<li><a href="ddb34321.htm" rel="nofollow"><strong>Mifamurtide</strong></a></li>
<li><a href="ddb8244.htm" rel="nofollow"><strong>Misoprostol</strong></a></li>
<li><a href="ddb62920.htm" rel="nofollow"><strong>Monomethyl fumarate</strong></a></li>
<li><a href="ddb29938.htm" rel="nofollow"><strong>Norfloxacin</strong></a></li>
<li><a href="ddb9231.htm" rel="nofollow"><strong>Ondansetron</strong></a></li>
<li><a href="ddb34018.htm" rel="nofollow"><strong>Palifermin</strong></a></li>
<li><a href="ddb34796.htm" rel="nofollow"><strong>Pazopanib</strong></a></li>
<li><a href="ddb33201.htm" rel="nofollow"><strong>Pramlintide</strong></a></li>
<li><a href="ddb10521.htm" rel="nofollow"><strong>Prednisolone</strong></a></li>
<li><a href="ddb10611.htm" rel="nofollow"><strong>Primaquine</strong></a></li>
<li><a href="ddb10729.htm" rel="nofollow"><strong>Proguanil</strong></a></li>
<li><a href="ddb11081.htm" rel="nofollow"><strong>Pyrimethamine</strong></a></li>
<li><a href="ddb11106.htm" rel="nofollow"><strong>Quinidine</strong></a></li>
<li><a href="ddb11124.htm" rel="nofollow"><strong>Quinine</strong></a></li>
<li><a href="ddb62908.htm" rel="nofollow"><strong>Ripretinib</strong></a></li>
<li><a href="ddb30126.htm" rel="nofollow"><strong>Rivastigmine</strong></a></li>
<li><a href="ddb30813.htm" rel="nofollow"><strong>Rofecoxib</strong></a></li>
<li><a href="ddb30438.htm" rel="nofollow"><strong>Sincalide</strong></a></li>
<li><a href="ddb12642.htm" rel="nofollow"><strong>Sulphasalazine</strong></a></li>
<li><a href="ddb60853.htm" rel="nofollow"><strong>Tazemetostat</strong></a></li>
<li><a href="ddb35139.htm" rel="nofollow"><strong>Teduglutide</strong></a></li>
<li><a href="ddb32517.htm" rel="nofollow"><strong>Tegafur</strong></a></li>
<li><a href="ddb62954.htm" rel="nofollow"><strong>Tepotinib</strong></a></li>
<li><a href="ddb35179.htm" rel="nofollow"><strong>Trametinib</strong></a></li>
<li><a href="ddb65119.htm" rel="nofollow"><strong>Tremelimumab</strong></a></li>
<li><a href="ddb65245.htm" rel="nofollow"><strong>Trilaciclib</strong></a></li>
<li><a href="ddb13703.htm" rel="nofollow"><strong>Valproic acid</strong></a></li>
<li><a href="ddb65109.htm" rel="nofollow"><strong>Voxelotor</strong></a></li>
<li><a href="ddb14245.htm" rel="nofollow"><strong>Zafirlukast</strong></a></li>
<li><a href="ddb31575.htm" rel="nofollow"><strong>Zotepine</strong></a></li>
</ul></dd>
</dl>

<hr></div>
"""
symptoms = extract_symptoms(html_content)
print(symptoms)
print("--------------------------")
print(ext(html_content))