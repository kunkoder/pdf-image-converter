<?php
    if (isset($_POST["upload"])) {
        if(!$_FILES["pdfile"]["name"]) {
            echo "
                <script>
                    alert('Pilih File PDF Terlebih Dahulu');
                    document.location.href = 'index.php';
                </script>
            ";
            return false;
        }

        $namaFile = $_FILES["pdfile"]["name"];
        $ukuranFile = $_FILES["pdfile"]["size"];
        $dirTemp = $_FILES["pdfile"]["tmp_name"];
        $error = $_FILES["pdfile"]["error"];
        
        $eksValid = ['pdf'];
        $eksGambar = explode('.', $namaFile);
        $eksGambar = strtolower(end($eksGambar));
        if( !in_array($eksGambar, $eksValid) ) {
            echo "
                <script>
                    alert('Format File yang dimasukan salah');
                    document.location.href = 'index.php';
                </script>
            ";
            return false;
        }
        if($ukuranFile > 1000000) {
            echo "
                <script>
                    alert('Ukuran File PDF Terlalu Besar');
                    document.location.href = 'index.php';
                </script>
            ";
            return false;
        }
        $namaBaru = uniqid();
        move_uploaded_file($dirTemp, 'storage/'.$namaBaru.'.'.$eksGambar);

        $imagick = new Imagick();
        $imagick->readImage('storage/'.$namaBaru.'.'.$eksGambar);
        $imagick->writeImages('storage/'.$namaBaru.'.jpg', true);
        
        $files = glob('storage/' . $namaBaru . "*.jpg");
    }