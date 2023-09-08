<?php
    require 'upload.php'   
?>

<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Home - Converter</title>
    <link rel="icon" href="img/icon.ico" type="image/x-icon" />

    <!-- Core CSS Files -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/atlantis.min.css">
    <link rel="stylesheet" href="css/custom.css">
</head>

<body data-background-color="custom" custom-background="img/bg-math.png"
    style="background-attachment: fixed; background-position: center;">
    <div class="wrapper horizontal-layout-3 fullwidth-style">

        <!-- Header -->
        <div class="main-header no-box-shadow" data-background-color="transparent">
            <div class="nav-top">
                <div class="container d-flex flex-row">
                    <a href="home-index.html" class="logo logo-fixed d-flex align-items-center">
                        <img src="img/gemapp-white.png" alt="navbar brand" class="navbar-brand mt-3" height="30">
                        <img src="img/gemapp-secondary.png" alt="navbar brand"
                            class="navbar-brand navbar-brand-logo-fixed" height="30">
                    </a>
                    <nav class="navbar navbar-header navbar-expand-lg p-0">
                </div>
            </div>
        </div>

        <!-- Main Panel -->
        <div class="main-panel">
            <div class="container">
                <div class="page-inner">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header text-center">
                                    <h3>PDF to Image Converter</h3>
                                    <p class="card-category">
                                        Using Imagick Library for PHP
                                    </p>
                                </div>
                                <div class="card-body">                             
                                    <form action="" class="dropzone" method="post" enctype="multipart/form-data"> <!-- action="index.php" -->
                                        <div class="dz-message" data-dz-message>
                                            <div class="icon">
                                                <i class="flaticon-file"></i>
                                            </div>
                                            <h4 class="message">Drag and Drop files here</h4>
                                        </div>
                                        <div class="fallback">
                                            <div class="custom-file">
                                                <input name="pdfile" type="file" class="custom-file-input" id="customFile">
                                                <label class="custom-file-label" for="customFile">Choose file</label>
                                              </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md mt-2">
                                                <button type="submit" name="upload" class="btn btn-secondary col-12">Process</button>
                                            </div>
                                        </div>
                                    </form>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="accordion accordion-secondary mt-5">
                                                <div class="card">
                                                    <div class="card-header collapsed" id="headingOne"
                                                        data-toggle="collapse" data-target="#collapseOne"
                                                        aria-expanded="false" aria-controls="collapseOne">
                                                        <div class="span-icon">
                                                            <i class="fas fa-chart-bar"></i>
                                                        </div>
                                                        <div class="span-title">Result</div>
                                                    </div>
                                                    <div id="collapseOne" class="collapse show collapse-rank"
                                                    aria-labelledby="headingOne" data-parent="#accordion">
                                                    <div class="card-body">

                                                        <?php if (isset($files)) : ?>

                                                            <?php foreach ($files as $file) : ?>

                                                            <div class="table-responsive">
                                                                <img src=<?= $file ?> alt="..."
                                                                    class="avatar-img">
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md mb-2">
                                                                    <a href=<?= $file ?> class="btn btn-secondary col-12 text-white" download>Download</a>
                                                                </div>
                                                            </div>

                                                            <?php endforeach ?>

                                                        <?php endif ?>
               
                                                        </div>                                                       
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="text-center text-white mt-2">
            <h6>©
                <script>
                    document.write(new Date().getFullYear())
                </script>, made with <i class="fa fa-heart heart text-danger"></i> by <a
                    href="https://github.com/kunkoder">kunkoder</a>
            </h6>
        </div>
    </div>

    <!-- Core JS Files -->
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/fontawesome.min.js"></script>
    <script src="js/atlantis.min.js"></script>
</body>

</html>

