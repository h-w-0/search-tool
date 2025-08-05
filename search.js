
        // 等待DOM加载完成
        document.addEventListener('DOMContentLoaded', function() {
            const searchForm = document.getElementById('searchForm');
            const selectAllBtn = document.getElementById('selectAll');
            const deselectAllBtn = document.getElementById('deselectAll');
            const recommendedBtn = document.getElementById('recommended');
            const groupSelectBtns = document.querySelectorAll('.select-all-group');
            
            // 表单提交处理
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // 获取搜索关键词
                const query = encodeURIComponent(document.querySelector('input[name="q"]').value.trim());
                
                // 获取选中的引擎
                const selectedEngines = Array.from(
                    document.querySelectorAll('input[name="engine"]:checked')
                ).map(checkbox => checkbox.value);
                
                // 如果没有选择引擎，提示用户
                if (selectedEngines.length === 0) {
                    alert('请至少选择一个搜索引擎');
                    return;
                }
                
                // 构建查询参数
                const engineParams = selectedEngines.join('%20');
                const fullQuery = `${query}%20${engineParams}`;
                
                // 构建完整URL
                const searchUrl = `https://search.ipv6s.net/search?q=${fullQuery}&categories=general&language=all`;
                
                // 在新窗口打开搜索结果
                window.open(searchUrl, '_blank');
            });
            
            // 全选所有引擎
            selectAllBtn.addEventListener('click', function() {
                document.querySelectorAll('input[name="engine"]').forEach(checkbox => {
                    checkbox.checked = true;
                });
            });
            
            // 取消所有选择
            deselectAllBtn.addEventListener('click', function() {
                document.querySelectorAll('input[name="engine"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
            });
            
            // 推荐预设：谷歌、雅虎、搜狗、夸克
            recommendedBtn.addEventListener('click', function() {
                // 先取消所有选择
                document.querySelectorAll('input[name="engine"]').forEach(checkbox => {
                    checkbox.checked = false;
                });
                
                // 选中推荐的引擎
                const recommendedEngines = ['!go', '!yh', '!sogou', '!qk'];
                recommendedEngines.forEach(engine => {
                    const checkbox = document.querySelector(`input[name="engine"][value="${engine}"]`);
                    if (checkbox) checkbox.checked = true;
                });
            });
            
            // 为每个组添加全选功能
            groupSelectBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    // 找到当前组内的所有复选框
                    const group = this.closest('.engine-group');
                    const checkboxes = group.querySelectorAll('input[name="engine"]');
                    
                    // 检查是否所有复选框都已选中
                    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
                    
                    // 全选或取消全选
                    checkboxes.forEach(checkbox => {
                        checkbox.checked = !allChecked;
                    });
                    
                    // 更新按钮文本
                    this.textContent = allChecked ? '全选' : '取消';
                });
            });
        });
