---
layout: default
title: MIDAS
---
<div style="text-align: justify;" markdown="1">
# Lesion‐Aware CT-to-MRI Synthesis using a Mask‐Informed Diffusion with Adaptive‐Weighted Loss (MIDAS)  

**Authors:** Prateek Mathur, Paul Banahan, Jane Burns, Peter MacMahon, Aonghus Lawlor  

**Published in:**  Simulation and Synthesis in Medical Imaging 10th International Workshop, SASHIMI 2025  



### Abstract
Recent years have seen the rapid adoption of AI in clinical spaces around the world. These tools have become critical to the provision of care and management of clinical resources. However, the research and development of the next generation of these tools is hampered by the paucity of high-quality, annotated and registered medical imaging data. To address this gap, we present MIDAS, a mask-informed diffusion framework that synthesises lesion-aware DWI MRI from non-contrast CT by conditioning on both a CT image and a binary lesion mask. We train MIDAS with an adaptive-weighted reconstruction loss which encourages image quality while enforcing lesion fidelity. We evaluate MIDAS using a two-phase oracle test on a held-out test set of 6,546 CT–MRI slices from ISLES-2024. In the quantitative phase, we resynthesise known DWI MRIs and compare the results against ground truth using SSIM, PSNR, LPIPS, MAE, and Earth Mover’s Distance. MIDAS matches or outperforms both a mask-agnostic baseline (ResViT) and a mask-aware GAN (Pix2Pix). In a blinded expert review, a radiologist ranks a random subset of the synthesised MRIs on lesion adherence, anatomical plausibility, and overall image quality. MIDAS is rated highest for overall quality and lesion alignment. Notably, expert rankings diverge from metric-based scores, highlighting a disconnect between standard similarity measures and clinical interpretation. Finally, in a downstream segmentation task, replacing 25–50% of real slices with MIDAS synthesised slices boosted lesion-wise F1 and precision versus an all-real baseline, demonstrating that MIDAS not only synthesises high-quality MRIs but also effectively augments data-scarce training.

### Links
* [Link to Paper] (https://link.springer.com/chapter/10.1007/978-3-032-05573-6_14)




### Poster

![Paper as a Poster]({{ site.baseurl }}/images/sashimi.PNG)  
