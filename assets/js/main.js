// Логика слайдеров (Кейсы и Отзывы)
        const sliders = {
            cases: { current: 0, count: 3 },
            reviews: { current: 0, count: 3 }
        };

        function moveSlider(id, direction) {
            const slider = sliders[id];
            slider.current += direction;
            if (slider.current < 0) slider.current = slider.count - 1;
            if (slider.current >= slider.count) slider.current = 0;
            updateSlider(id);
        }

        function setSlider(id, index) {
            sliders[id].current = index;
            updateSlider(id);
        }

        function updateSlider(id) {
            const track = document.getElementById(`slider-track-${id}`);
            if (track) {
                track.style.transform = `translateX(-${sliders[id].current * 100}%)`;
            }
            
            const dots = document.querySelectorAll(`.dot-${id}`);
            dots.forEach((dot, index) => {
                if (index === sliders[id].current) {
                    dot.classList.remove('bg-gray-300', 'w-2');
                    dot.classList.add('bg-[#E8501A]', 'w-6');
                } else {
                    dot.classList.add('bg-gray-300', 'w-2');
                    dot.classList.remove('bg-[#E8501A]', 'w-6');
                }
            });
        }

        // Логика FAQ (Аккордеон)
        function toggleFaq(button) {
            const content = button.nextElementSibling;
            const icon = button.querySelector('svg');
            const isExpanded = !content.classList.contains('hidden');

            if (!isExpanded) {
                content.classList.remove('hidden');
                icon.classList.add('rotate-180');
            } else {
                content.classList.add('hidden');
                icon.classList.remove('rotate-180');
            }
        }

